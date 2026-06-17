/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesService } from './templates.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TemplatesService', () => {
  let service: TemplatesService;
  let prisma: PrismaService;

  const mockPrisma = {
    petitionTemplate: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TemplatesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all templates', async () => {
      const expectedResult = [{ id: '1', name: 'Template 1' }];
      mockPrisma.petitionTemplate.findMany.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findPublic', () => {
    it('should return public templates', async () => {
      const expectedResult = [{ id: '1', name: 'Template 1', isPublic: true }];
      mockPrisma.petitionTemplate.findMany.mockResolvedValue(expectedResult);

      const result = await service.findPublic();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a template', async () => {
      const expectedResult = { id: '1', name: 'Template 1' };
      mockPrisma.petitionTemplate.findUnique.mockResolvedValue(expectedResult);

      const result = await service.findOne('1');

      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException when template not found', async () => {
      mockPrisma.petitionTemplate.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create a template', async () => {
      const dto = { name: 'Template 1', content: 'Content', category: 'Civil' };
      const expectedResult = { id: '1', ...dto };
      mockPrisma.petitionTemplate.create.mockResolvedValue(expectedResult);

      const result = await service.create(dto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a template', async () => {
      const dto = { name: 'Updated Template' };
      const expectedResult = { id: '1', name: 'Updated Template' };
      mockPrisma.petitionTemplate.findUnique.mockResolvedValue({ id: '1' });
      mockPrisma.petitionTemplate.update.mockResolvedValue(expectedResult);

      const result = await service.update('1', dto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should delete a template', async () => {
      const expectedResult = { id: '1' };
      mockPrisma.petitionTemplate.findUnique.mockResolvedValue({ id: '1' });
      mockPrisma.petitionTemplate.delete.mockResolvedValue(expectedResult);

      const result = await service.remove('1');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getAvailableForUser', () => {
    it('should return templates available for user with expanded library', async () => {
      const mockUser = {
        id: 'user1',
        planId: 'plan1',
        plan: { hasExpandedLibrary: true, hasCustomTemplates: false },
      };
      const expectedResult = [{ id: '1', name: 'Template 1' }];

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.petitionTemplate.findMany.mockResolvedValue(expectedResult);

      const result = await service.getAvailableForUser('user1');

      expect(result).toEqual(expectedResult);
    });

    it('should throw ForbiddenException when user has no plan', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'user1', plan: null });

      await expect(service.getAvailableForUser('user1')).rejects.toThrow();
    });
  });
});
