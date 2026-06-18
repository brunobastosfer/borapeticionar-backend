import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { AuthMailerService } from './auth-mailer.service';
export declare class AuthService {
    private readonly prisma;
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    private readonly authMailerService;
    constructor(prisma: PrismaService, usersService: UsersService, jwtService: JwtService, configService: ConfigService, authMailerService: AuthMailerService);
    validateUser(email: string, password: string): Promise<{
        plan: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import("../../generated/prisma/enums").PlanType;
            price: number;
            monthlyLimit: number | null;
            isAvailable: boolean;
            canExportPdf: boolean;
            canExportWord: boolean;
            practiceAreas: string[];
            hasDashboard: boolean;
            hasFullHistory: boolean;
            hasExpandedLibrary: boolean;
            isMultiUser: boolean;
            hasTeamManagement: boolean;
            hasPriority: boolean;
            hasCustomTemplates: boolean;
            hasRealTimePreview: boolean;
            hasBasicEditor: boolean;
            hasBasicExport: boolean;
            features: string[];
        } | null;
        id: string;
        firstName: string;
        lastName: string;
        cpf: string;
        oabNumber: string | null;
        sex: import("../../generated/prisma/enums").Sex | null;
        practiceArea: string | null;
        institutionalEmail: string;
        role: import("../../generated/prisma/enums").Role;
        planId: string | null;
        organizationId: string | null;
        linkedToId: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    login(user: {
        id: string;
        institutionalEmail: string;
        role: string;
    }, userAgent: string, ipAddress?: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    refreshTokens(oldRefreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<{
        message: string;
    }>;
    requestPasswordReset(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    private generateRefreshToken;
    private createSession;
    private isSameDeviceSession;
    private invalidateUserSessions;
    private deactivateUserSessions;
    private generatePasswordResetToken;
    private hashPasswordResetToken;
    private buildPasswordResetUrl;
}
