import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { AuthCaptchaService } from '../auth-captcha.service';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly authCaptchaService: AuthCaptchaService,
  ) {
    super({ usernameField: 'institutionalEmail', passReqToCallback: true });
  }

  async validate(req: Request, email: string, password: string) {
    await this.authCaptchaService.verify(
      (req.body as { captchaToken?: unknown })?.captchaToken,
      req.ip,
    );

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return user;
  }
}
