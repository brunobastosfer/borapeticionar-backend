/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockPrisma = {
    session: {
      findFirst: jest.fn(),
      create: jest.fn(),
      updateMany: jest.fn(),
    },
    refreshToken: {
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);

    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user data when credentials are valid', async () => {
      const mockUser = {
        id: '1',
        institutionalEmail: 'test@test.com',
        password: 'hashedPassword',
        role: 'USER',
      };

      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@test.com', 'password123');

      expect(result).toBeDefined();
      expect(result?.id).toBe('1');
      expect(result?.institutionalEmail).toBe('test@test.com');
    });

    it('should return null when user not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('test@test.com', 'password123');

      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      const mockUser = {
        id: '1',
        institutionalEmail: 'test@test.com',
        password: 'hashedPassword',
      };

      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser(
        'test@test.com',
        'wrongpassword',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should throw ConflictException when user has active session', async () => {
      const mockUser = {
        id: '1',
        institutionalEmail: 'test@test.com',
        role: 'USER',
      };

      mockPrisma.session.findFirst.mockResolvedValue({
        id: 'session1',
        userId: '1',
        isActive: true,
      });

      await expect(
        service.login(mockUser, 'Mozilla/5.0', '127.0.0.1'),
      ).rejects.toThrow(ConflictException);
    });

    it('should create session and return tokens when no active session', async () => {
      const mockUser = {
        id: '1',
        institutionalEmail: 'test@test.com',
        role: 'USER',
      };

      mockPrisma.session.findFirst.mockResolvedValue(null);
      mockJwtService.sign.mockReturnValue('accessToken');
      mockConfigService.get.mockReturnValue('secret');
      mockPrisma.refreshToken.create.mockResolvedValue({
        token: 'refreshToken',
      });
      mockPrisma.session.create.mockResolvedValue({});

      const result = await service.login(mockUser, 'Mozilla/5.0', '127.0.0.1');

      expect(result.accessToken).toBe('accessToken');
      expect(result.refreshToken).toBeDefined();
      expect(mockPrisma.session.create).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should delete refresh tokens and deactivate sessions', async () => {
      mockPrisma.refreshToken.deleteMany.mockResolvedValue({ count: 1 });
      mockPrisma.session.updateMany.mockResolvedValue({ count: 1 });

      const result = await service.logout('1', 'refreshToken');

      expect(result.message).toBe('Logout realizado com sucesso');
      expect(mockPrisma.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: { userId: '1', token: 'refreshToken' },
      });
      expect(mockPrisma.session.updateMany).toHaveBeenCalledWith({
        where: { userId: '1', isActive: true },
        data: { isActive: false },
      });
    });
  });

  describe('refreshTokens', () => {
    it('should throw ForbiddenException when refresh token is invalid', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue(null);

      await expect(service.refreshTokens('1', 'invalidToken')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException when refresh token belongs to different user', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: '1',
        token: 'token',
        userId: '2',
      });

      await expect(service.refreshTokens('1', 'token')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException when refresh token is expired', async () => {
      const expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() - 1);

      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: '1',
        token: 'token',
        userId: '1',
        expiresAt: expiredDate,
      });
      mockPrisma.refreshToken.delete.mockResolvedValue({});

      await expect(service.refreshTokens('1', 'token')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should return new tokens when refresh token is valid', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);

      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: '1',
        token: 'token',
        userId: '1',
        expiresAt: futureDate,
      });
      mockPrisma.refreshToken.delete.mockResolvedValue({});
      mockPrisma.user.findUnique.mockResolvedValue({
        id: '1',
        institutionalEmail: 'test@test.com',
      });
      mockJwtService.sign.mockReturnValue('newAccessToken');
      mockConfigService.get.mockReturnValue('secret');
      mockPrisma.refreshToken.create.mockResolvedValue({
        token: 'newRefreshToken',
      });

      const result = await service.refreshTokens('1', 'token');

      expect(result.accessToken).toBe('newAccessToken');
      expect(result.refreshToken).toBeDefined();
    });

    it('should throw UnauthorizedException when user not found', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);

      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: '1',
        token: 'token',
        userId: '1',
        expiresAt: futureDate,
      });
      mockPrisma.refreshToken.delete.mockResolvedValue({});
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.refreshTokens('1', 'token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
