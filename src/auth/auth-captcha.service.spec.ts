import {
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthCaptchaService } from './auth-captcha.service';

describe('AuthCaptchaService', () => {
  const mockConfigService = {
    get: jest.fn(),
  };

  let service: AuthCaptchaService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthCaptchaService(mockConfigService as unknown as ConfigService);
  });

  it('should reject missing captcha token', async () => {
    await expect(service.verify('')).rejects.toThrow(UnauthorizedException);
  });

  it('should allow local verification when captcha is not configured outside production', async () => {
    mockConfigService.get.mockReturnValue(undefined);

    await expect(service.verify('local-human-check')).resolves.toBe(true);
  });

  it('should block login when captcha is required but not configured', async () => {
    mockConfigService.get.mockImplementation((key: string) => {
      if (key === 'CAPTCHA_REQUIRED') return 'true';
      return undefined;
    });

    await expect(service.verify('captcha-token')).rejects.toThrow(
      ServiceUnavailableException,
    );
  });
});
