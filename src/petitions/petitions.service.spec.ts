/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import {
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PetitionsService } from './petitions.service';
import { PrismaService } from '../prisma/prisma.service';
import { PetitionStatus } from '@prisma/client';
import { AuthMailerService } from '../auth/auth-mailer.service';

describe('PetitionsService', () => {
  let service: PetitionsService;
  let prisma: PrismaService;
  let authMailerService: AuthMailerService;

  const mockPrisma = {
    petition: {
      create: jest.fn(),
      count: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    favorite: {
      findUnique: jest.fn(),
      create: jest.fn(),
      count: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
    petitionUsage: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockAuthMailerService = {
    sendPetitionPdfEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetitionsService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: AuthMailerService, useValue: mockAuthMailerService },
      ],
    }).compile();

    service = module.get<PetitionsService>(PetitionsService);
    prisma = module.get<PrismaService>(PrismaService);
    authMailerService = module.get<AuthMailerService>(AuthMailerService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create petition when within limit', async () => {
      const dto = {
        content: 'Petition content',
      };

      const mockUser = {
        id: 'user1',
        plan: { monthlyLimit: 15, practiceAreas: ['trabalhista'] },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.petitionUsage.findUnique.mockResolvedValue({ count: 5 });
      mockPrisma.petition.create.mockResolvedValue({ id: '1', ...dto });
      mockPrisma.petitionUsage.findUnique.mockResolvedValue({
        id: 'usage1',
        count: 5,
      });
      mockPrisma.petitionUsage.update.mockResolvedValue({});

      const result = await service.create('user1', dto);

      expect(result).toBeDefined();
      expect(mockPrisma.petition.create).toHaveBeenCalled();
    });

    it('should throw ForbiddenException when limit reached', async () => {
      const dto = {
        content: 'Petition content',
      };

      const mockUser = {
        id: 'user1',
        plan: { monthlyLimit: 2, practiceAreas: ['trabalhista'] },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.petitionUsage.findUnique.mockResolvedValue({ count: 2 });

      await expect(service.create('user1', dto)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException when practice area not allowed', async () => {
      const dto = {
        content: 'Petition content',
        practiceArea: 'civil',
      };

      const mockUser = {
        id: 'user1',
        plan: { monthlyLimit: 15, practiceAreas: ['trabalhista'] },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.petitionUsage.findUnique.mockResolvedValue({ count: 0 });

      await expect(service.create('user1', dto)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('saveDraft', () => {
    it('should save draft without checking limits', async () => {
      const dto = {
        content: 'Petition content',
      };

      mockPrisma.petition.create.mockResolvedValue({
        id: '1',
        ...dto,
        status: PetitionStatus.DRAFT,
      });

      const result = await service.saveDraft('user1', dto);

      expect(result.status).toBe(PetitionStatus.DRAFT);
      expect(mockPrisma.petitionUsage.findUnique).not.toHaveBeenCalled();
    });
  });

  describe('activateDraft', () => {
    it('should activate draft when all requirements met', async () => {
      const mockDraft = {
        id: '1',
        userId: 'user1',
        status: PetitionStatus.DRAFT,
        content: 'Petition content',
        practiceArea: null,
      };

      const mockUser = {
        id: 'user1',
        plan: { monthlyLimit: 15, practiceAreas: ['trabalhista'] },
      };

      mockPrisma.petition.findUnique.mockResolvedValue(mockDraft);
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.petitionUsage.findUnique.mockResolvedValue({ count: 0 });
      mockPrisma.petition.update.mockResolvedValue({
        ...mockDraft,
        status: PetitionStatus.ACTIVE,
      });
      mockPrisma.petitionUsage.update.mockResolvedValue({});

      const result = await service.activateDraft('1', 'user1');

      expect(result.status).toBe(PetitionStatus.ACTIVE);
    });

    it('should throw BadRequestException when petition is not a draft', async () => {
      const mockPetition = {
        id: '1',
        userId: 'user1',
        status: PetitionStatus.ACTIVE,
      };

      mockPrisma.petition.findUnique.mockResolvedValue(mockPetition);

      await expect(service.activateDraft('1', 'user1')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when required fields are missing', async () => {
      const mockDraft = {
        id: '1',
        userId: 'user1',
        status: PetitionStatus.DRAFT,
        content: '',
        practiceArea: null,
      };

      const mockUser = {
        id: 'user1',
        plan: { monthlyLimit: 15, practiceAreas: ['trabalhista'] },
      };

      mockPrisma.petition.findUnique.mockResolvedValue(mockDraft);
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.petitionUsage.findUnique.mockResolvedValue({ count: 0 });

      await expect(service.activateDraft('1', 'user1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findOne', () => {
    it('should return petition when user owns it', async () => {
      const mockPetition = { id: '1', userId: 'user1' };

      mockPrisma.petition.findUnique.mockResolvedValue(mockPetition);

      const result = await service.findOne('1', 'user1');

      expect(result).toBeDefined();
      expect(result.id).toBe('1');
    });

    it('should throw NotFoundException when petition not found', async () => {
      mockPrisma.petition.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1', 'user1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException when user does not own petition', async () => {
      const mockPetition = { id: '1', userId: 'user2' };

      mockPrisma.petition.findUnique.mockResolvedValue(mockPetition);

      await expect(service.findOne('1', 'user1')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('archive', () => {
    it('should archive petition successfully', async () => {
      const mockPetition = { id: '1', userId: 'user1' };

      mockPrisma.petition.findUnique.mockResolvedValue(mockPetition);
      mockPrisma.petition.update.mockResolvedValue({
        ...mockPetition,
        status: PetitionStatus.ARCHIVED,
      });

      const result = await service.archive('1', 'user1');

      expect(result.status).toBe(PetitionStatus.ARCHIVED);
    });
  });

  describe('addFavorite', () => {
    it('should add favorite successfully', async () => {
      const mockPetition = { id: '1', userId: 'user1' };

      mockPrisma.petition.findUnique.mockResolvedValue(mockPetition);
      mockPrisma.favorite.findUnique.mockResolvedValue(null);
      mockPrisma.favorite.create.mockResolvedValue({
        id: 'fav1',
        userId: 'user1',
        petitionId: '1',
      });

      const result = await service.addFavorite('user1', '1');

      expect(result).toBeDefined();
    });

    it('should throw BadRequestException when already favorited', async () => {
      const mockPetition = { id: '1', userId: 'user1' };

      mockPrisma.petition.findUnique.mockResolvedValue(mockPetition);
      mockPrisma.favorite.findUnique.mockResolvedValue({ id: 'fav1' });

      await expect(service.addFavorite('user1', '1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('canExportPdf', () => {
    it('should return true when plan allows PDF export', async () => {
      const mockUser = {
        id: 'user1',
        plan: { canExportPdf: true },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.canExportPdf('user1');

      expect(result).toBe(true);
    });

    it('should return false when plan does not allow PDF export', async () => {
      const mockUser = {
        id: 'user1',
        plan: { canExportPdf: false },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.canExportPdf('user1');

      expect(result).toBe(false);
    });

    it('should return false when user has no plan', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'user1', plan: null });

      const result = await service.canExportPdf('user1');

      expect(result).toBe(false);
    });
  });

  describe('canExportWord', () => {
    it('should return true when plan allows Word export', async () => {
      const mockUser = {
        id: 'user1',
        plan: { canExportWord: true },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.canExportWord('user1');

      expect(result).toBe(true);
    });

    it('should return false when plan does not allow Word export', async () => {
      const mockUser = {
        id: 'user1',
        plan: { canExportWord: false },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.canExportWord('user1');

      expect(result).toBe(false);
    });
  });

  describe('sendPetitionMail', () => {
    const activePetition = {
      id: '1',
      userId: 'user1',
      status: PetitionStatus.ACTIVE,
      fullName: 'John Doe',
      cpfCnpj: '12345678900',
      rg: null,
      maritalStatus: null,
      cep: null,
      street: null,
      defendantCompany: 'Company',
      cnpj: null,
      facts: 'Facts',
      requests: 'Requests',
      content: 'Full petition content',
      practiceArea: 'trabalhista',
    };

    it('should send generated petition PDF to informed email', async () => {
      mockPrisma.petition.findUnique.mockResolvedValue(activePetition);
      mockAuthMailerService.sendPetitionPdfEmail.mockResolvedValue(undefined);

      const result = await service.sendPetitionMail(
        'user1',
        '1',
        'Destino@Example.com ',
      );

      expect(result).toEqual({
        petitionId: '1',
        recipientEmail: 'destino@example.com',
        status: 'SENT',
        message: 'Peticao enviada por email com sucesso',
      });
      expect(mockAuthMailerService.sendPetitionPdfEmail).toHaveBeenCalledWith({
        to: 'destino@example.com',
        petitionId: '1',
        pdfFilename: 'peticao-1.pdf',
        pdfBuffer: expect.any(Buffer),
      });

      const sentPayload =
        mockAuthMailerService.sendPetitionPdfEmail.mock.calls[0][0];
      expect(sentPayload.pdfBuffer.subarray(0, 4).toString()).toBe('%PDF');
    });

    it('should block draft petition email sending', async () => {
      mockPrisma.petition.findUnique.mockResolvedValue({
        ...activePetition,
        status: PetitionStatus.DRAFT,
      });

      await expect(
        service.sendPetitionMail('user1', '1', 'destino@example.com'),
      ).rejects.toThrow(BadRequestException);
      expect(mockAuthMailerService.sendPetitionPdfEmail).not.toHaveBeenCalled();
    });

    it('should require a valid recipient email', async () => {
      mockPrisma.petition.findUnique.mockResolvedValue(activePetition);

      await expect(
        service.sendPetitionMail('user1', '1', 'email-invalido'),
      ).rejects.toThrow(BadRequestException);
      expect(mockAuthMailerService.sendPetitionPdfEmail).not.toHaveBeenCalled();
    });
  });

  describe('getUserPermissions', () => {
    it('should return all permissions for user', async () => {
      const mockUser = {
        id: 'user1',
        plan: {
          name: 'Essencial',
          type: 'ESSENTIAL',
          monthlyLimit: 15,
          canExportPdf: true,
          canExportWord: true,
          hasDashboard: false,
          hasFullHistory: true,
          hasExpandedLibrary: false,
          hasCustomTemplates: false,
          hasRealTimePreview: true,
          hasBasicEditor: true,
          hasPriority: false,
          practiceAreas: ['trabalhista'],
        },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.petitionUsage.findUnique.mockResolvedValue({ count: 5 });

      const result = await service.getUserPermissions('user1');

      expect(result.permissions.canCreatePetition).toBe(true);
      expect(result.permissions.canExportPdf).toBe(true);
      expect(result.usage.remaining).toBe(10);
      expect(result.allowedPracticeAreas).toContain('trabalhista');
    });

    it('should throw NotFoundException when user has no plan', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'user1', plan: null });

      await expect(service.getUserPermissions('user1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getDashboardSummary', () => {
    it('should return home dashboard counters for user', async () => {
      const mockUser = {
        id: 'user1',
        plan: {
          monthlyLimit: 15,
        },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.petitionUsage.findUnique.mockResolvedValue({ count: 5 });
      mockPrisma.petition.count.mockResolvedValue(2);
      mockPrisma.favorite.count.mockResolvedValue(3);

      const result = await service.getDashboardSummary('user1');

      expect(result).toEqual({
        petitionsRemaining: 10,
        petitionsGenerated: 5,
        petitionsCanceled: 2,
        favoritePiecesTotal: 3,
      });
      expect(mockPrisma.petition.count).toHaveBeenCalledWith({
        where: { userId: 'user1', status: PetitionStatus.ARCHIVED },
      });
      expect(mockPrisma.favorite.count).toHaveBeenCalledWith({
        where: { userId: 'user1' },
      });
    });

    it('should return null remaining petitions when plan is unlimited', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user1',
        plan: { monthlyLimit: null },
      });
      mockPrisma.petitionUsage.findUnique.mockResolvedValue({ count: 20 });
      mockPrisma.petition.count.mockResolvedValue(0);
      mockPrisma.favorite.count.mockResolvedValue(0);

      const result = await service.getDashboardSummary('user1');

      expect(result.petitionsRemaining).toBeNull();
      expect(result.petitionsGenerated).toBe(20);
    });

    it('should throw NotFoundException when user has no plan', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'user1', plan: null });
      mockPrisma.petitionUsage.findUnique.mockResolvedValue(null);
      mockPrisma.petition.count.mockResolvedValue(0);
      mockPrisma.favorite.count.mockResolvedValue(0);

      await expect(service.getDashboardSummary('user1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
