/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  const mockPrisma = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    plan: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const dto = {
        firstName: 'John',
        lastName: 'Doe',
        cpf: '12345678900',
        institutionalEmail: 'john@test.com',
        password: 'password123',
      };

      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.plan.findUnique.mockResolvedValue({ id: 'plan1' });
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockPrisma.user.create.mockResolvedValue({
        id: '1',
        ...dto,
        password: 'hashedPassword',
      });

      const result = await service.create(dto);

      expect(result).toBeDefined();
      expect(result.id).toBe('1');
      expect(mockPrisma.user.create).toHaveBeenCalled();
    });

    it('should throw ConflictException when email already exists', async () => {
      const dto = {
        firstName: 'John',
        lastName: 'Doe',
        cpf: '12345678900',
        institutionalEmail: 'john@test.com',
        password: 'password123',
      };

      mockPrisma.user.findUnique.mockResolvedValueOnce({ id: '1' });

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException when CPF already exists', async () => {
      const dto = {
        firstName: 'John',
        lastName: 'Doe',
        cpf: '12345678900',
        institutionalEmail: 'john@test.com',
        password: 'password123',
      };

      mockPrisma.user.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ id: '1' });

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should return user when found', async () => {
      const mockUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        password: 'hashedPassword',
        planExpiresAt: new Date('2026-07-19T00:00:00.000Z'),
        plan: { id: 'plan1' },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne('1');

      expect(result).toBeDefined();
      expect(result.id).toBe('1');
      expect(result.planExpiresAt).toEqual(
        new Date('2026-07-19T00:00:00.000Z'),
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect((result as any).password).toBeUndefined();
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return user with plan when found', async () => {
      const mockUser = {
        id: '1',
        institutionalEmail: 'john@test.com',
        plan: { id: 'plan1' },
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findByEmail('john@test.com');

      expect(result).toBeDefined();
      expect(result?.institutionalEmail).toBe('john@test.com');
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const dto = { firstName: 'Jane' };
      const mockUser = { id: '1', firstName: 'John' };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.user.update.mockResolvedValue({ ...mockUser, ...dto });

      const result = await service.update('1', dto);

      expect(result.firstName).toBe('Jane');
    });

    it('should hash password when updating', async () => {
      const dto = { password: 'newpassword123' };
      const mockUser = { id: '1', firstName: 'John' };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedNewPassword');
      mockPrisma.user.update.mockResolvedValue({ ...mockUser });

      await service.update('1', dto);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 12);
    });
  });

  describe('remove', () => {
    it('should delete user successfully', async () => {
      const mockUser = { id: '1', firstName: 'John' };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.user.delete.mockResolvedValue(mockUser);

      const result = await service.remove('1');

      expect(result).toBeDefined();
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
