/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { AuthCaptchaService } from '../auth-captcha.service';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
  };

  const mockAuthCaptchaService = {
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        { provide: AuthService, useValue: mockAuthService },
        { provide: AuthCaptchaService, useValue: mockAuthCaptchaService },
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
    const req = {
      body: { captchaToken: 'captcha-token' },
      ip: '127.0.0.1',
    };
    mockAuthCaptchaService.verify.mockResolvedValue(true);
    mockAuthService.validateUser.mockResolvedValue(mockUser);

    const result = await strategy.validate(
      req as any,
      'test@test.com',
      'password123',
    );

    expect(result).toEqual(mockUser);
    expect(mockAuthCaptchaService.verify).toHaveBeenCalledWith(
      'captcha-token',
      '127.0.0.1',
    );
    expect(mockAuthService.validateUser).toHaveBeenCalledWith(
      'test@test.com',
      'password123',
    );
  });

  it('should throw UnauthorizedException when user is null', async () => {
    mockAuthCaptchaService.verify.mockResolvedValue(true);
    mockAuthService.validateUser.mockResolvedValue(null);

    await expect(
      strategy.validate(
        { body: { captchaToken: 'captcha-token' }, ip: '127.0.0.1' } as any,
        'test@test.com',
        'wrongpassword',
      ),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should not validate credentials when captcha fails', async () => {
    mockAuthCaptchaService.verify.mockRejectedValue(
      new UnauthorizedException('Confirme que voce nao e um robo.'),
    );

    await expect(
      strategy.validate(
        { body: {}, ip: '127.0.0.1' } as any,
        'test@test.com',
        'password123',
      ),
    ).rejects.toThrow(UnauthorizedException);
    expect(mockAuthService.validateUser).not.toHaveBeenCalled();
  });
});
