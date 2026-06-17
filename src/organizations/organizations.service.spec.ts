/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsService } from './organizations.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

describe('OrganizationsService', () => {
  let service: OrganizationsService;
  let prisma: PrismaService;

  const mockPrisma = {
    organization: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    organizationMember: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create organization when user has OFFICE plan', async () => {
      const dto = { name: 'My Office' };
      const mockUser = {
        id: 'user1',
        plan: { isMultiUser: true },
        planId: 'officePlan',
      };
      const expectedResult = { id: 'org1', ...dto };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.organization.create.mockResolvedValue(expectedResult);
      mockPrisma.organizationMember.create.mockResolvedValue({});

      const result = await service.create('user1', dto);

      expect(result).toEqual(expectedResult);
    });

    it('should throw ForbiddenException when user does not have OFFICE plan', async () => {
      const dto = { name: 'My Office' };
      const mockUser = {
        id: 'user1',
        plan: { isMultiUser: false },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      await expect(service.create('user1', dto)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('findByOwner', () => {
    it('should return organizations owned by user', async () => {
      const expectedResult = [{ id: 'org1', name: 'My Office' }];
      mockPrisma.organization.findMany.mockResolvedValue(expectedResult);

      const result = await service.findByOwner('user1');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return organization when user is member', async () => {
      const mockOrg = {
        id: 'org1',
        members: [{ userId: 'user1' }],
      };
      mockPrisma.organization.findUnique.mockResolvedValue(mockOrg);

      const result = await service.findOne('org1', 'user1');

      expect(result).toEqual(mockOrg);
    });

    it('should throw NotFoundException when organization not found', async () => {
      mockPrisma.organization.findUnique.mockResolvedValue(null);

      await expect(service.findOne('org1', 'user1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException when user is not member', async () => {
      const mockOrg = {
        id: 'org1',
        members: [{ userId: 'user2' }],
      };
      mockPrisma.organization.findUnique.mockResolvedValue(mockOrg);

      await expect(service.findOne('org1', 'user1')).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('addMember', () => {
    it('should add member when user is owner or admin', async () => {
      const mockOrg = {
        id: 'org1',
        ownerId: 'user1',
        members: [{ userId: 'user1', role: 'owner' }],
      };
      const expectedResult = { id: 'member1', userId: 'user2' };

      mockPrisma.organization.findUnique.mockResolvedValue(mockOrg);
      mockPrisma.organizationMember.create.mockResolvedValue(expectedResult);

      const result = await service.addMember(
        'org1',
        'user1',
        'user2',
        'member',
      );

      expect(result).toEqual(expectedResult);
    });

    it('should throw ConflictException when user already member', async () => {
      const mockOrg = {
        id: 'org1',
        ownerId: 'user1',
        members: [
          { userId: 'user1', role: 'owner' },
          { userId: 'user2', role: 'member' },
        ],
      };

      mockPrisma.organization.findUnique.mockResolvedValue(mockOrg);

      await expect(service.addMember('org1', 'user1', 'user2')).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('removeMember', () => {
    it('should remove member', async () => {
      const mockOrg = {
        id: 'org1',
        ownerId: 'user1',
        members: [
          { userId: 'user1', role: 'owner' },
          { userId: 'user2', role: 'member' },
        ],
      };
      const expectedResult = { id: 'member1' };

      mockPrisma.organization.findUnique.mockResolvedValue(mockOrg);
      mockPrisma.organizationMember.delete.mockResolvedValue(expectedResult);

      const result = await service.removeMember('org1', 'user1', 'user2');

      expect(result).toEqual(expectedResult);
    });

    it('should throw ForbiddenException when trying to remove owner', async () => {
      const mockOrg = {
        id: 'org1',
        ownerId: 'user1',
        members: [
          { userId: 'user1', role: 'owner' },
          { userId: 'user2', role: 'admin' },
        ],
      };

      mockPrisma.organization.findUnique.mockResolvedValue(mockOrg);

      await expect(
        service.removeMember('org1', 'user2', 'user1'),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getMembers', () => {
    it('should return all members', async () => {
      const mockOrg = {
        id: 'org1',
        members: [{ userId: 'user1' }],
      };
      const expectedResult = [{ userId: 'user1', user: { firstName: 'John' } }];

      mockPrisma.organization.findUnique.mockResolvedValue(mockOrg);
      mockPrisma.organizationMember.findMany.mockResolvedValue(expectedResult);

      const result = await service.getMembers('org1', 'user1');

      expect(result).toEqual(expectedResult);
    });
  });
});
