import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_REFRESH_SECRET');
    if (!secret) {
      throw new Error('JWT_REFRESH_SECRET não configurado');
    }
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true as const,
    });
  }

  validate(req: Request, payload: { sub: string; email: string }) {
    const refreshToken = (req.body as { refreshToken?: string })?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token não fornecido');
    }
    return { id: payload.sub, email: payload.email, refreshToken };
  }
}
