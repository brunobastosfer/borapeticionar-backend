/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { PrismaService } from '../prisma/prisma.service';
import { PlanType, Role } from '@prisma/client';

describe('PlansService', () => {
  let service: PlansService;
  let prisma: PrismaService;

  const mockPrisma = {
    plan: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      update: jest.fn(),
      findUnique: jest.fn(),
      updateMany: jest.fn(),
    },
    petitionUsage: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlansService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PlansService>(PlansService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return plan when found', async () => {
      const mockPlan = { id: '1', name: 'Gratuito', type: PlanType.FREE };
      mockPrisma.plan.findUnique.mockResolvedValue(mockPlan);

      const result = await service.findOne('1');

      expect(result).toBeDefined();
      expect(result.id).toBe('1');
    });

    it('should throw NotFoundException when plan not found', async () => {
      mockPrisma.plan.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('subscribe', () => {
    it('should subscribe user to plan and set role to COMPANY for OFFICE plan', async () => {
      const mockPlan = {
        id: 'plan1',
        type: PlanType.OFFICE,
        isAvailable: true,
      };
      const mockUser = {
        id: 'user1',
        role: Role.COMPANY,
        plan: mockPlan,
      };

      mockPrisma.plan.findUnique.mockResolvedValue(mockPlan);
      mockPrisma.user.update.mockResolvedValue(mockUser);

      const result = await service.subscribe('user1', 'plan1');

      expect(result.role).toBe(Role.COMPANY);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user1' },
        data: {
          planId: 'plan1',
          planExpiresAt: expect.any(Date),
          role: Role.COMPANY,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        select: expect.any(Object),
      });
    });

    it('should subscribe user to plan and set role to USER for non-OFFICE plan', async () => {
      const mockPlan = {
        id: 'plan1',
        type: PlanType.ESSENTIAL,
        isAvailable: true,
      };
      const mockUser = {
        id: 'user1',
        role: Role.USER,
        plan: mockPlan,
      };
      const freePlan = { id: 'freePlan', type: PlanType.FREE };

      mockPrisma.plan.findUnique
        .mockResolvedValueOnce(mockPlan)
        .mockResolvedValueOnce(freePlan);
      mockPrisma.user.update.mockResolvedValue(mockUser);
      mockPrisma.user.updateMany.mockResolvedValue({ count: 0 });

      const result = await service.subscribe('user1', 'plan1');

      expect(result.role).toBe(Role.USER);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user1' },
        data: {
          planId: 'plan1',
          planExpiresAt: expect.any(Date),
          role: Role.USER,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        select: expect.any(Object),
      });
    });

    it('should subscribe user to free plan without expiration date', async () => {
      const mockPlan = {
        id: 'freePlan',
        type: PlanType.FREE,
        isAvailable: true,
      };
      const mockUser = {
        id: 'user1',
        role: Role.USER,
        plan: mockPlan,
        planExpiresAt: null,
      };
      const freePlan = { id: 'freePlan', type: PlanType.FREE };

      mockPrisma.plan.findUnique
        .mockResolvedValueOnce(mockPlan)
        .mockResolvedValueOnce(freePlan);
      mockPrisma.user.update.mockResolvedValue(mockUser);
      mockPrisma.user.updateMany.mockResolvedValue({ count: 0 });

      const result = await service.subscribe('user1', 'freePlan');

      expect(result.planExpiresAt).toBeNull();
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user1' },
        data: {
          planId: 'freePlan',
          planExpiresAt: null,
          role: Role.USER,
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        select: expect.any(Object),
      });
    });

    it('should throw ForbiddenException when plan is not available', async () => {
      const mockPlan = {
        id: 'plan1',
        type: PlanType.PROFESSIONAL,
        isAvailable: false,
      };

      mockPrisma.plan.findUnique.mockResolvedValue(mockPlan);

      await expect(service.subscribe('user1', 'plan1')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should downgrade linked users when downgrading from OFFICE plan', async () => {
      const mockPlan = {
        id: 'plan1',
        type: PlanType.ESSENTIAL,
        isAvailable: true,
      };
      const freePlan = { id: 'freePlan', type: PlanType.FREE };

      mockPrisma.plan.findUnique
        .mockResolvedValueOnce(mockPlan)
        .mockResolvedValueOnce(freePlan);
      mockPrisma.user.update.mockResolvedValue({
        id: 'user1',
        role: Role.USER,
      });
      mockPrisma.user.updateMany.mockResolvedValue({ count: 2 });

      await service.subscribe('user1', 'plan1');

      expect(mockPrisma.user.updateMany).toHaveBeenCalledWith({
        where: { linkedToId: 'user1' },
        data: { planId: 'freePlan', planExpiresAt: null },
      });
    });
  });

  describe('linkUser', () => {
    it('should link user successfully', async () => {
      const companyUser = {
        id: 'company1',
        role: Role.COMPANY,
        planId: 'officePlan',
        planExpiresAt: new Date('2026-07-19T00:00:00.000Z'),
        plan: { id: 'officePlan' },
        linkedUsers: [],
      };
      const linkedUser = {
        id: 'user1',
        linkedToId: null,
      };

      mockPrisma.user.findUnique
        .mockResolvedValueOnce(companyUser)
        .mockResolvedValueOnce(linkedUser);
      mockPrisma.user.update.mockResolvedValue({
        ...linkedUser,
        linkedToId: 'company1',
      });

      const result = await service.linkUser('company1', 'user1');

      expect(result.linkedToId).toBe('company1');
    });

    it('should throw ForbiddenException when user is not COMPANY', async () => {
      const regularUser = {
        id: 'user1',
        role: Role.USER,
        plan: null,
        linkedUsers: [],
      };

      mockPrisma.user.findUnique.mockResolvedValue(regularUser);

      await expect(service.linkUser('user1', 'user2')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw BadRequestException when limit of 2 linked users reached', async () => {
      const companyUser = {
        id: 'company1',
        role: Role.COMPANY,
        plan: { id: 'officePlan' },
        linkedUsers: [{ id: 'user1' }, { id: 'user2' }],
      };

      mockPrisma.user.findUnique.mockResolvedValue(companyUser);

      await expect(service.linkUser('company1', 'user3')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException when linked user not found', async () => {
      const companyUser = {
        id: 'company1',
        role: Role.COMPANY,
        plan: { id: 'officePlan' },
        linkedUsers: [],
      };

      mockPrisma.user.findUnique
        .mockResolvedValueOnce(companyUser)
        .mockResolvedValueOnce(null);

      await expect(service.linkUser('company1', 'user1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when user already linked', async () => {
      const companyUser = {
        id: 'company1',
        role: Role.COMPANY,
        plan: { id: 'officePlan' },
        linkedUsers: [],
      };
      const linkedUser = {
        id: 'user1',
        linkedToId: 'otherCompany',
      };

      mockPrisma.user.findUnique
        .mockResolvedValueOnce(companyUser)
        .mockResolvedValueOnce(linkedUser);

      await expect(service.linkUser('company1', 'user1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('unlinkUser', () => {
    it('should unlink user successfully', async () => {
      const companyUser = {
        id: 'company1',
        role: Role.COMPANY,
        linkedUsers: [{ id: 'user1' }],
      };
      const freePlan = { id: 'freePlan', type: PlanType.FREE };

      mockPrisma.user.findUnique.mockResolvedValue(companyUser);
      mockPrisma.plan.findUnique.mockResolvedValue(freePlan);
      mockPrisma.user.update.mockResolvedValue({
        id: 'user1',
        linkedToId: null,
      });

      const result = await service.unlinkUser('company1', 'user1');

      expect(result.linkedToId).toBeNull();
    });

    it('should throw ForbiddenException when user is not COMPANY', async () => {
      const regularUser = {
        id: 'user1',
        role: Role.USER,
        linkedUsers: [],
      };

      mockPrisma.user.findUnique.mockResolvedValue(regularUser);

      await expect(service.unlinkUser('user1', 'user2')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw NotFoundException when user not linked', async () => {
      const companyUser = {
        id: 'company1',
        role: Role.COMPANY,
        linkedUsers: [],
      };

      mockPrisma.user.findUnique.mockResolvedValue(companyUser);

      await expect(service.unlinkUser('company1', 'user1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getLinkedUsers', () => {
    it('should return linked users for COMPANY user', async () => {
      const companyUser = {
        id: 'company1',
        role: Role.COMPANY,
        linkedUsers: [
          { id: 'user1', firstName: 'John' },
          { id: 'user2', firstName: 'Jane' },
        ],
      };

      mockPrisma.user.findUnique.mockResolvedValue(companyUser);

      const result = await service.getLinkedUsers('company1');

      expect(result).toHaveLength(2);
    });

    it('should throw ForbiddenException when user is not COMPANY', async () => {
      const regularUser = {
        id: 'user1',
        role: Role.USER,
        linkedUsers: [],
      };

      mockPrisma.user.findUnique.mockResolvedValue(regularUser);

      await expect(service.getLinkedUsers('user1')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('getUsage', () => {
    it('should return usage data for user with plan', async () => {
      const mockUser = {
        id: 'user1',
        plan: {
          id: 'plan1',
          monthlyLimit: 15,
        },
      };
      const mockUsage = {
        count: 5,
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.petitionUsage.findUnique.mockResolvedValue(mockUsage);

      const result = await service.getUsage('user1');

      expect(result.currentMonth.used).toBe(5);
      expect(result.currentMonth.limit).toBe(15);
      expect(result.currentMonth.remaining).toBe(10);
    });

    it('should throw NotFoundException when user has no plan', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'user1', plan: null });

      await expect(service.getUsage('user1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return null remaining for unlimited plan', async () => {
      const mockUser = {
        id: 'user1',
        plan: {
          id: 'plan1',
          monthlyLimit: null,
        },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.petitionUsage.findUnique.mockResolvedValue(null);

      const result = await service.getUsage('user1');

      expect(result.currentMonth.remaining).toBeNull();
    });
  });
});
