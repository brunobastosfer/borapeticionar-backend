import {
  HttpException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type TurnstileResponse = {
  success?: boolean;
  'error-codes'?: string[];
};

@Injectable()
export class AuthCaptchaService {
  private readonly verifyUrl =
    'https://challenges.cloudflare.com/turnstile/v0/siteverify';

  constructor(private readonly configService: ConfigService) {}

  async verify(captchaToken: unknown, ipAddress?: string) {
    const token =
      typeof captchaToken === 'string' ? captchaToken.trim() : undefined;

    if (!token) {
      throw new UnauthorizedException('Confirme que voce nao e um robo.');
    }

    const secretKey = this.getSecretKey();
    if (!secretKey) {
      if (this.isCaptchaRequired()) {
        throw new ServiceUnavailableException('Captcha nao configurado.');
      }
      return true;
    }

    const body = new URLSearchParams({
      secret: secretKey,
      response: token,
    });

    if (ipAddress) {
      body.set('remoteip', ipAddress);
    }

    const timeoutController = new AbortController();
    const timeout = setTimeout(
      () => timeoutController.abort(),
      this.getTimeoutMs(),
    );

    try {
      const response = await fetch(this.verifyUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body,
        signal: timeoutController.signal,
      });

      if (!response.ok) {
        throw new ServiceUnavailableException(
          'Servico de captcha indisponivel.',
        );
      }

      const result = (await response.json()) as TurnstileResponse;
      if (!result.success) {
        throw new UnauthorizedException(
          'Nao foi possivel confirmar que voce nao e um robo.',
        );
      }

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new ServiceUnavailableException(
        'Servico de captcha indisponivel. Tente novamente.',
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  private getSecretKey() {
    return (
      this.configService.get<string>('TURNSTILE_SECRET_KEY') ||
      this.configService.get<string>('CAPTCHA_SECRET_KEY') ||
      ''
    ).trim();
  }

  private isCaptchaRequired() {
    const explicit = this.configService.get<string>('CAPTCHA_REQUIRED');
    if (explicit !== undefined) {
      return ['1', 'true', 'yes', 'sim'].includes(explicit.toLowerCase());
    }

    return (
      this.configService.get<string>('NODE_ENV') === 'production' ||
      process.env.NODE_ENV === 'production'
    );
  }

  private getTimeoutMs() {
    const configured = Number(
      this.configService.get<string>('CAPTCHA_TIMEOUT_MS'),
    );
    return Number.isFinite(configured) && configured > 0 ? configured : 5000;
  }
}
