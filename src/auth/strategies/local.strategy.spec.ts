/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should return user when credentials are valid', async () => {
    const mockUser = { id: '1', email: 'test@test.com' };
    mockAuthService.validateUser.mockResolvedValue(mockUser);

    const result = await strategy.validate('test@test.com', 'password123');

    expect(result).toEqual(mockUser);
    expect(mockAuthService.validateUser).toHaveBeenCalledWith(
      'test@test.com',
      'password123',
    );
  });

  it('should throw UnauthorizedException when user is null', async () => {
    mockAuthService.validateUser.mockResolvedValue(null);

    await expect(
      strategy.validate('test@test.com', 'wrongpassword'),
    ).rejects.toThrow(UnauthorizedException);
  });
});
