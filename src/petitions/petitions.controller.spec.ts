/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PetitionsController } from './petitions.controller';
import { PetitionsService } from './petitions.service';

describe('PetitionsController', () => {
  let controller: PetitionsController;
  let petitionsService: PetitionsService;

  const mockPetitionsService = {
    create: jest.fn(),
    saveDraft: jest.fn(),
    activateDraft: jest.fn(),
    findAllByUser: jest.fn(),
    findActive: jest.fn(),
    findArchived: jest.fn(),
    findDrafts: jest.fn(),
    getFavorites: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    archive: jest.fn(),
    remove: jest.fn(),
    addFavorite: jest.fn(),
    removeFavorite: jest.fn(),
    canExportPdf: jest.fn(),
    canExportWord: jest.fn(),
    getDashboardSummary: jest.fn(),
    getUserPermissions: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetitionsController],
      providers: [
        { provide: PetitionsService, useValue: mockPetitionsService },
      ],
    }).compile();

    controller = module.get<PetitionsController>(PetitionsController);
    petitionsService = module.get<PetitionsService>(PetitionsService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a petition', async () => {
      const req = { user: { id: 'user1' } };
      const dto = {
        content: 'Petition content',
        font: 'Merriweather',
        practiceArea: 'trabalhista',
        textColor: '#1b1c1c',
      };
      const expectedResult = { id: '1', ...dto };

      mockPetitionsService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(req, dto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('saveDraft', () => {
    it('should save a draft', async () => {
      const req = { user: { id: 'user1' } };
      const dto = {
        content: 'Draft petition content',
        font: 'Merriweather',
        practiceArea: 'trabalhista',
        textColor: '#1b1c1c',
      };
      const expectedResult = { id: '1', status: 'DRAFT', ...dto };

      mockPetitionsService.saveDraft.mockResolvedValue(expectedResult);

      const result = await controller.saveDraft(req, dto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('activateDraft', () => {
    it('should activate a draft', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = { id: '1', status: 'ACTIVE' };

      mockPetitionsService.activateDraft.mockResolvedValue(expectedResult);

      const result = await controller.activateDraft('1', req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all petitions', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = [{ id: '1' }, { id: '2' }];

      mockPetitionsService.findAllByUser.mockResolvedValue(expectedResult);

      const result = await controller.findAll(req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a petition', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = { id: '1' };

      mockPetitionsService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1', req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('archive', () => {
    it('should archive a petition', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = { id: '1', status: 'ARCHIVED' };

      mockPetitionsService.archive.mockResolvedValue(expectedResult);

      const result = await controller.archive('1', req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('addFavorite', () => {
    it('should add favorite', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = { id: 'fav1' };

      mockPetitionsService.addFavorite.mockResolvedValue(expectedResult);

      const result = await controller.addFavorite('1', req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('removeFavorite', () => {
    it('should remove favorite', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = { id: 'fav1' };

      mockPetitionsService.removeFavorite.mockResolvedValue(expectedResult);

      const result = await controller.removeFavorite('1', req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getPermissions', () => {
    it('should return user permissions', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = { permissions: { canExportPdf: true } };

      mockPetitionsService.getUserPermissions.mockResolvedValue(expectedResult);

      const result = await controller.getPermissions(req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getDashboardSummary', () => {
    it('should return dashboard counters', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = {
        petitionsRemaining: 10,
        petitionsGenerated: 5,
        petitionsCanceled: 2,
        favoritePiecesTotal: 3,
      };

      mockPetitionsService.getDashboardSummary.mockResolvedValue(
        expectedResult,
      );

      const result = await controller.getDashboardSummary(req);

      expect(result).toEqual(expectedResult);
      expect(mockPetitionsService.getDashboardSummary).toHaveBeenCalledWith(
        'user1',
      );
    });
  });
});
