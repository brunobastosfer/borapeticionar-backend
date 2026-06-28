import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  const mockPrisma = {
    session: {
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-secret'),
          },
        },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should return user object when payload has an active session', async () => {
    const payload = {
      sub: '1',
      email: 'test@test.com',
      role: 'USER',
      sid: 'session1',
    };
    mockPrisma.session.findFirst.mockResolvedValue({ id: 'session1' });

    const result = await strategy.validate(payload as any);

    expect(result).toEqual({ id: '1', email: 'test@test.com', role: 'USER' });
    expect(mockPrisma.session.findFirst).toHaveBeenCalledWith({
      where: {
        id: 'session1',
        userId: '1',
        isActive: true,
        expiresAt: { gt: expect.any(Date) },
      },
      select: { id: true },
    });
  });

  it('should throw UnauthorizedException when sub is missing', async () => {
    const payload = { email: 'test@test.com', role: 'USER', sid: 'session1' };

    await expect(strategy.validate(payload as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when email is missing', async () => {
    const payload = { sub: '1', role: 'USER', sid: 'session1' };

    await expect(strategy.validate(payload as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when session id is missing', async () => {
    const payload = { sub: '1', email: 'test@test.com', role: 'USER' };

    await expect(strategy.validate(payload as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when session is inactive', async () => {
    const payload = {
      sub: '1',
      email: 'test@test.com',
      role: 'USER',
      sid: 'session1',
    };
    mockPrisma.session.findFirst.mockResolvedValue(null);

    await expect(strategy.validate(payload as any)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
