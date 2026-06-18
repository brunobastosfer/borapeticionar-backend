import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
export declare class OrganizationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateOrganizationDto): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        cnpj: string | null;
        ownerId: string;
    }>;
    findByOwner(userId: string): Promise<({
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
        members: ({
            user: {
                id: string;
                firstName: string;
                lastName: string;
                cpf: string;
                oabNumber: string | null;
                sex: import("../../generated/prisma/enums").Sex | null;
                practiceArea: string | null;
                institutionalEmail: string;
                password: string;
                role: import("../../generated/prisma/enums").Role;
                planId: string | null;
                organizationId: string | null;
                linkedToId: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            role: string;
            organizationId: string;
            userId: string;
            joinedAt: Date;
        })[];
    } & {
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        cnpj: string | null;
        ownerId: string;
    })[]>;
    findUserOrganizations(userId: string): Promise<({
        organization: {
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
        } & {
            id: string;
            planId: string | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            cnpj: string | null;
            ownerId: string;
        };
    } & {
        id: string;
        role: string;
        organizationId: string;
        userId: string;
        joinedAt: Date;
    })[]>;
    findOne(id: string, userId: string): Promise<{
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
        members: {
            id: string;
            role: string;
            organizationId: string;
            userId: string;
            joinedAt: Date;
        }[];
    } & {
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        cnpj: string | null;
        ownerId: string;
    }>;
    update(id: string, userId: string, dto: UpdateOrganizationDto): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        cnpj: string | null;
        ownerId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        cnpj: string | null;
        ownerId: string;
    }>;
    addMember(organizationId: string, userId: string, memberUserId: string, role?: string): Promise<{
        id: string;
        role: string;
        organizationId: string;
        userId: string;
        joinedAt: Date;
    }>;
    removeMember(organizationId: string, userId: string, memberUserId: string): Promise<{
        id: string;
        role: string;
        organizationId: string;
        userId: string;
        joinedAt: Date;
    }>;
    getMembers(organizationId: string, userId: string): Promise<({
        user: {
            id: string;
            firstName: string;
            lastName: string;
            institutionalEmail: string;
        };
    } & {
        id: string;
        role: string;
        organizationId: string;
        userId: string;
        joinedAt: Date;
    })[]>;
}
