/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import { AuthMailerService } from './auth-mailer.service';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;

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
    passwordResetToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
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

  const mockAuthMailerService = {
    sendPasswordResetEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: AuthMailerService, useValue: mockAuthMailerService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

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
      expect(result).not.toHaveProperty('password');
    });

    it('should return null when user not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('test@test.com', 'password123');

      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      mockUsersService.findByEmail.mockResolvedValue({
        id: '1',
        institutionalEmail: 'test@test.com',
        password: 'hashedPassword',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser(
        'test@test.com',
        'wrongpassword',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should throw ConflictException when user has active session on another device', async () => {
      const mockUser = {
        id: '1',
        institutionalEmail: 'test@test.com',
        role: 'USER',
        hasSeenTutorial: false,
      };

      mockPrisma.session.findFirst.mockResolvedValue({
        id: 'session1',
        userId: '1',
        userAgent: 'Other browser',
        ipAddress: '10.0.0.2',
        isActive: true,
      });

      await expect(
        service.login(mockUser, 'Mozilla/5.0', '127.0.0.1'),
      ).rejects.toThrow(ConflictException);
    });

    it('should replace active session when login comes from the same device', async () => {
      const mockUser = {
        id: '1',
        institutionalEmail: 'test@test.com',
        role: 'USER',
        hasSeenTutorial: false,
      };

      mockPrisma.session.findFirst.mockResolvedValue({
        id: 'session1',
        userId: '1',
        userAgent: 'Mozilla/5.0',
        ipAddress: '127.0.0.1',
        isActive: true,
      });
      mockJwtService.sign.mockReturnValue('accessToken');
      mockConfigService.get.mockReturnValue('secret');
      mockPrisma.refreshToken.deleteMany.mockResolvedValue({ count: 1 });
      mockPrisma.session.updateMany.mockResolvedValue({ count: 1 });
      mockPrisma.refreshToken.create.mockResolvedValue({
        token: 'refreshToken',
      });
      mockPrisma.session.create.mockResolvedValue({});

      const result = await service.login(mockUser, 'Mozilla/5.0', '127.0.0.1');

      expect(result.accessToken).toBe('accessToken');
      expect(mockPrisma.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: { userId: '1' },
      });
      expect(mockPrisma.session.updateMany).toHaveBeenCalledWith({
        where: { userId: '1', isActive: true },
        data: { isActive: false },
      });
      expect(mockPrisma.session.create).toHaveBeenCalled();
    });

    it('should create session and return tokens when no active session', async () => {
      const mockUser = {
        id: '1',
        institutionalEmail: 'test@test.com',
        role: 'USER',
        hasSeenTutorial: true,
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
      expect(result.user.hasSeenTutorial).toBe(true);
      expect(mockPrisma.session.create).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should delete refresh tokens and deactivate sessions', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: 'token1',
        token: 'refreshToken',
        userId: '1',
        expiresAt: new Date(Date.now() + 60_000),
      });
      mockPrisma.refreshToken.deleteMany.mockResolvedValue({ count: 1 });
      mockPrisma.session.updateMany.mockResolvedValue({ count: 1 });

      const result = await service.logout('refreshToken');

      expect(result.message).toBe('Logout realizado com sucesso');
      expect(mockPrisma.refreshToken.findUnique).toHaveBeenCalledWith({
        where: { token: 'refreshToken' },
      });
      expect(mockPrisma.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: { userId: '1', token: 'refreshToken' },
      });
      expect(mockPrisma.session.updateMany).toHaveBeenCalledWith({
        where: { userId: '1', isActive: true },
        data: { isActive: false },
      });
    });

    it('should be idempotent when refresh token is already invalid', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue(null);

      const result = await service.logout('missingRefreshToken');

      expect(result.message).toBe('Logout realizado com sucesso');
      expect(mockPrisma.refreshToken.deleteMany).not.toHaveBeenCalled();
      expect(mockPrisma.session.updateMany).not.toHaveBeenCalled();
    });
  });

  describe('requestPasswordReset', () => {
    it('should generate token and send recovery email when user exists', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        institutionalEmail: 'john@test.com',
      });
      mockPrisma.passwordResetToken.updateMany.mockResolvedValue({ count: 0 });
      mockPrisma.passwordResetToken.create.mockResolvedValue({ id: 'token1' });
      mockAuthMailerService.sendPasswordResetEmail.mockResolvedValue(undefined);
      mockConfigService.get.mockImplementation((key: string) => {
        if (key === 'PASSWORD_RESET_URL') {
          return 'https://app.borapeticionar.com/reset-password';
        }
        return undefined;
      });

      const result = await service.requestPasswordReset('john@test.com');

      expect(result.message).toContain('Se o email informado existir');
      expect(mockPrisma.passwordResetToken.updateMany).toHaveBeenCalledWith({
        where: { userId: 'user1', usedAt: null },
        data: { usedAt: expect.any(Date) },
      });
      expect(mockPrisma.passwordResetToken.create).toHaveBeenCalledWith({
        data: {
          userId: 'user1',
          tokenHash: expect.any(String),
          expiresAt: expect.any(Date),
        },
      });
      expect(mockAuthMailerService.sendPasswordResetEmail).toHaveBeenCalledWith(
        {
          to: 'john@test.com',
          recipientName: 'John Doe',
          resetPasswordUrl: expect.stringContaining(
            'https://app.borapeticionar.com/reset-password?token=',
          ),
        },
      );
    });

    it('should not send email when user does not exist', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await service.requestPasswordReset('missing@test.com');

      expect(result.message).toContain('Se o email informado existir');
      expect(mockPrisma.passwordResetToken.create).not.toHaveBeenCalled();
      expect(
        mockAuthMailerService.sendPasswordResetEmail,
      ).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('should update password and invalidate sessions when token is valid', async () => {
      const token = 'reset-token';
      const tokenHash = createHash('sha256').update(token).digest('hex');
      const futureDate = new Date(Date.now() + 30 * 60_000);

      mockPrisma.passwordResetToken.findUnique.mockResolvedValue({
        id: 'token1',
        userId: 'user1',
        tokenHash,
        expiresAt: futureDate,
        usedAt: null,
      });
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedNewPassword');
      mockPrisma.user.update.mockResolvedValue({ id: 'user1' });
      mockPrisma.passwordResetToken.update.mockResolvedValue({ id: 'token1' });
      mockPrisma.refreshToken.deleteMany.mockResolvedValue({ count: 1 });
      mockPrisma.session.updateMany.mockResolvedValue({ count: 1 });

      const result = await service.resetPassword(token, 'newPassword123');

      expect(result.message).toBe('Senha redefinida com sucesso');
      expect(mockPrisma.passwordResetToken.findUnique).toHaveBeenCalledWith({
        where: { tokenHash },
      });
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user1' },
        data: { password: 'hashedNewPassword' },
      });
      expect(mockPrisma.passwordResetToken.update).toHaveBeenCalledWith({
        where: { id: 'token1' },
        data: { usedAt: expect.any(Date) },
      });
      expect(mockPrisma.refreshToken.deleteMany).toHaveBeenCalledWith({
        where: { userId: 'user1' },
      });
      expect(mockPrisma.session.updateMany).toHaveBeenCalledWith({
        where: { userId: 'user1', isActive: true },
        data: { isActive: false },
      });
    });

    it('should throw BadRequestException when token is expired', async () => {
      mockPrisma.passwordResetToken.findUnique.mockResolvedValue({
        id: 'token1',
        userId: 'user1',
        expiresAt: new Date(Date.now() - 60_000),
        usedAt: null,
      });

      await expect(
        service.resetPassword('expired-token', 'newPassword123'),
      ).rejects.toThrow(BadRequestException);
      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });
  });

  describe('refreshTokens', () => {
    it('should throw ForbiddenException when refresh token is invalid', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue(null);

      await expect(service.refreshTokens('invalidToken')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException and deactivate sessions when refresh token is expired', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: '1',
        token: 'token',
        userId: '1',
        expiresAt: new Date(Date.now() - 60_000),
      });
      mockPrisma.refreshToken.delete.mockResolvedValue({});
      mockPrisma.session.updateMany.mockResolvedValue({ count: 1 });

      await expect(service.refreshTokens('token')).rejects.toThrow(
        ForbiddenException,
      );
      expect(mockPrisma.session.updateMany).toHaveBeenCalledWith({
        where: { userId: '1', isActive: true },
        data: { isActive: false },
      });
    });

    it('should return new tokens when refresh token is valid', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: '1',
        token: 'token',
        userId: '1',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60_000),
      });
      mockPrisma.refreshToken.delete.mockResolvedValue({});
      mockPrisma.user.findUnique.mockResolvedValue({
        id: '1',
        institutionalEmail: 'test@test.com',
        role: 'USER',
      });
      mockJwtService.sign.mockReturnValue('newAccessToken');
      mockConfigService.get.mockReturnValue('secret');
      mockPrisma.refreshToken.create.mockResolvedValue({
        token: 'newRefreshToken',
      });

      const result = await service.refreshTokens('token');

      expect(result.accessToken).toBe('newAccessToken');
      expect(result.refreshToken).toBeDefined();
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockPrisma.refreshToken.findUnique.mockResolvedValue({
        id: '1',
        token: 'token',
        userId: '1',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60_000),
      });
      mockPrisma.refreshToken.delete.mockResolvedValue({});
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.refreshTokens('token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
