/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';

describe('TemplatesController', () => {
  let controller: TemplatesController;
  let templatesService: TemplatesService;

  const mockTemplatesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findPublic: jest.fn(),
    getAvailableForUser: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [
        { provide: TemplatesService, useValue: mockTemplatesService },
      ],
    }).compile();

    controller = module.get<TemplatesController>(TemplatesController);
    templatesService = module.get<TemplatesService>(TemplatesService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a template', async () => {
      const dto = { name: 'Template 1', content: 'Content', category: 'Civil' };
      const expectedResult = { id: '1', ...dto };

      mockTemplatesService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all templates', async () => {
      const expectedResult = [{ id: '1', name: 'Template 1' }];

      mockTemplatesService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findPublic', () => {
    it('should return public templates', async () => {
      const expectedResult = [{ id: '1', name: 'Template 1', isPublic: true }];

      mockTemplatesService.findPublic.mockResolvedValue(expectedResult);

      const result = await controller.findPublic();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getAvailable', () => {
    it('should return available templates for user', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = [{ id: '1', name: 'Template 1' }];

      mockTemplatesService.getAvailableForUser.mockResolvedValue(
        expectedResult,
      );

      const result = await controller.getAvailable(req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a template', async () => {
      const expectedResult = { id: '1', name: 'Template 1' };

      mockTemplatesService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a template', async () => {
      const dto = { name: 'Updated Template' };
      const expectedResult = { id: '1', name: 'Updated Template' };

      mockTemplatesService.update.mockResolvedValue(expectedResult);

      const result = await controller.update('1', dto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should delete a template', async () => {
      const expectedResult = { id: '1' };

      mockTemplatesService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove('1');

      expect(result).toEqual(expectedResult);
    });
  });
});
