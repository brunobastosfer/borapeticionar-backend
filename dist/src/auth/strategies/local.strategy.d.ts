import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<{
        plan: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            type: import("../../../generated/prisma/enums").PlanType;
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
        sex: import("../../../generated/prisma/enums").Sex | null;
        practiceArea: string | null;
        institutionalEmail: string;
        role: import("../../../generated/prisma/enums").Role;
        planId: string | null;
        organizationId: string | null;
        linkedToId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
