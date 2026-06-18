import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { AuthMailerService } from './auth-mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authMailerService: AuthMailerService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  async login(
    user: { id: string; institutionalEmail: string; role: string },
    userAgent: string,
    ipAddress?: string,
  ) {
    const activeSession = await this.prisma.session.findFirst({
      where: {
        userId: user.id,
        isActive: true,
        expiresAt: { gt: new Date() },
      },
    });

    if (activeSession) {
      if (this.isSameDeviceSession(activeSession, userAgent, ipAddress)) {
        await this.invalidateUserSessions(user.id);
      } else {
        throw new ConflictException(
          'Voce ja esta logado em outra maquina. Faca logout antes de acessar de outro dispositivo.',
        );
      }
    }

    const payload = {
      sub: user.id,
      email: user.institutionalEmail,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET')!,
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME')!,
    } as any);

    const refreshToken = await this.generateRefreshToken(user.id);

    await this.createSession(user.id, userAgent, ipAddress);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.institutionalEmail,
        role: user.role,
      },
    };
  }

  async refreshTokens(oldRefreshToken: string) {
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: oldRefreshToken },
    });

    if (!storedToken) {
      throw new ForbiddenException('Refresh token invalido');
    }

    if (storedToken.expiresAt < new Date()) {
      await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });
      await this.deactivateUserSessions(storedToken.userId);
      throw new ForbiddenException('Refresh token expirado');
    }

    await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });

    const user = await this.prisma.user.findUnique({
      where: { id: storedToken.userId },
      select: { id: true, institutionalEmail: true, role: true },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario nao encontrado');
    }

    const payload = {
      sub: user.id,
      email: user.institutionalEmail,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET')!,
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME')!,
    } as any);

    const refreshToken = await this.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string) {
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken) {
      return { message: 'Logout realizado com sucesso' };
    }

    await this.prisma.refreshToken.deleteMany({
      where: { userId: storedToken.userId, token: refreshToken },
    });

    await this.deactivateUserSessions(storedToken.userId);

    return { message: 'Logout realizado com sucesso' };
  }

  async requestPasswordReset(email: string) {
    const response = {
      message:
        'Se o email informado existir, enviaremos as instrucoes de recuperacao de senha.',
    };

    const user = await this.prisma.user.findUnique({
      where: { institutionalEmail: email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        institutionalEmail: true,
      },
    });

    if (!user) {
      return response;
    }

    const token = this.generatePasswordResetToken();
    const tokenHash = this.hashPasswordResetToken(token);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await this.prisma.passwordResetToken.updateMany({
      where: {
        userId: user.id,
        usedAt: null,
      },
      data: { usedAt: new Date() },
    });

    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    await this.authMailerService.sendPasswordResetEmail({
      to: user.institutionalEmail,
      recipientName: `${user.firstName} ${user.lastName}`.trim(),
      resetPasswordUrl: this.buildPasswordResetUrl(token),
    });

    return response;
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = this.hashPasswordResetToken(token);

    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
      throw new BadRequestException(
        'Token de recuperacao invalido ou expirado',
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await this.prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    await this.prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usedAt: new Date() },
    });

    await this.prisma.refreshToken.deleteMany({
      where: { userId: resetToken.userId },
    });

    await this.deactivateUserSessions(resetToken.userId);

    return { message: 'Senha redefinida com sucesso' };
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  private async createSession(
    userId: string,
    userAgent: string,
    ipAddress?: string,
  ) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.session.create({
      data: {
        userId,
        userAgent,
        ipAddress,
        expiresAt,
      },
    });
  }

  private isSameDeviceSession(
    session: { userAgent?: string | null; ipAddress?: string | null },
    userAgent: string,
    ipAddress?: string,
  ) {
    return (
      session.userAgent === userAgent &&
      (session.ipAddress ?? null) === (ipAddress ?? null)
    );
  }

  private async invalidateUserSessions(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });

    await this.deactivateUserSessions(userId);
  }

  private async deactivateUserSessions(userId: string) {
    await this.prisma.session.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });
  }

  private generatePasswordResetToken() {
    return randomBytes(32).toString('hex');
  }

  private hashPasswordResetToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  private buildPasswordResetUrl(token: string) {
    const frontendUrl =
      this.configService.get<string>('FRONTEND_URL') || 'http://localhost:5173';
    const baseUrl =
      this.configService.get<string>('PASSWORD_RESET_URL') ||
      `${frontendUrl.replace(/\/$/, '')}/reset-password`;

    const url = new URL(baseUrl);
    url.searchParams.set('token', token);
    return url.toString();
  }
}
