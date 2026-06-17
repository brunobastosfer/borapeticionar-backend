import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Headers,
  Ip,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Request()
    req: { user: { id: string; institutionalEmail: string; role: string } },
    @Headers('user-agent') userAgent: string,
    @Ip() ipAddress: string,
  ) {
    return this.authService.login(req.user, userAgent || 'Unknown', ipAddress);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Request() req: { user: { id: string; refreshToken: string } },
  ) {
    return this.authService.refreshTokens(req.user.id, req.user.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Request() req: { user: { id: string } },
    @Body() dto: RefreshTokenDto,
  ) {
    return this.authService.logout(req.user.id, dto.refreshToken);
  }
}
