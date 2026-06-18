"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
const uuid_1 = require("uuid");
const prisma_service_1 = require("../prisma/prisma.service");
const users_service_1 = require("../users/users.service");
const auth_mailer_service_1 = require("./auth-mailer.service");
let AuthService = class AuthService {
    prisma;
    usersService;
    jwtService;
    configService;
    authMailerService;
    constructor(prisma, usersService, jwtService, configService, authMailerService) {
        this.prisma = prisma;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.authMailerService = authMailerService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        const { password: _, ...result } = user;
        return result;
    }
    async login(user, userAgent, ipAddress) {
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
            }
            else {
                throw new common_1.ConflictException('Voce ja esta logado em outra maquina. Faca logout antes de acessar de outro dispositivo.');
            }
        }
        const payload = {
            sub: user.id,
            email: user.institutionalEmail,
            role: user.role,
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
        });
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
    async refreshTokens(oldRefreshToken) {
        const storedToken = await this.prisma.refreshToken.findUnique({
            where: { token: oldRefreshToken },
        });
        if (!storedToken) {
            throw new common_1.ForbiddenException('Refresh token invalido');
        }
        if (storedToken.expiresAt < new Date()) {
            await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });
            await this.deactivateUserSessions(storedToken.userId);
            throw new common_1.ForbiddenException('Refresh token expirado');
        }
        await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });
        const user = await this.prisma.user.findUnique({
            where: { id: storedToken.userId },
            select: { id: true, institutionalEmail: true, role: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario nao encontrado');
        }
        const payload = {
            sub: user.id,
            email: user.institutionalEmail,
            role: user.role,
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
        });
        const refreshToken = await this.generateRefreshToken(user.id);
        return { accessToken, refreshToken };
    }
    async logout(refreshToken) {
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
    async requestPasswordReset(email) {
        const response = {
            message: 'Se o email informado existir, enviaremos as instrucoes de recuperacao de senha.',
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
    async resetPassword(token, newPassword) {
        const tokenHash = this.hashPasswordResetToken(token);
        const resetToken = await this.prisma.passwordResetToken.findUnique({
            where: { tokenHash },
        });
        if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Token de recuperacao invalido ou expirado');
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
    async generateRefreshToken(userId) {
        const token = (0, uuid_1.v4)();
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
    async createSession(userId, userAgent, ipAddress) {
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
    isSameDeviceSession(session, userAgent, ipAddress) {
        return (session.userAgent === userAgent &&
            (session.ipAddress ?? null) === (ipAddress ?? null));
    }
    async invalidateUserSessions(userId) {
        await this.prisma.refreshToken.deleteMany({
            where: { userId },
        });
        await this.deactivateUserSessions(userId);
    }
    async deactivateUserSessions(userId) {
        await this.prisma.session.updateMany({
            where: { userId, isActive: true },
            data: { isActive: false },
        });
    }
    generatePasswordResetToken() {
        return (0, crypto_1.randomBytes)(32).toString('hex');
    }
    hashPasswordResetToken(token) {
        return (0, crypto_1.createHash)('sha256').update(token).digest('hex');
    }
    buildPasswordResetUrl(token) {
        const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:5173';
        const baseUrl = this.configService.get('PASSWORD_RESET_URL') ||
            `${frontendUrl.replace(/\/$/, '')}/reset-password`;
        const url = new URL(baseUrl);
        url.searchParams.set('token', token);
        return url.toString();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        auth_mailer_service_1.AuthMailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map