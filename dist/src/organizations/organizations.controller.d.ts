import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { AddMemberDto } from './dto/add-member.dto';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    create(req: {
        user: {
            id: string;
        };
    }, dto: CreateOrganizationDto): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        cnpj: string | null;
        ownerId: string;
    }>;
    findByOwner(req: {
        user: {
            id: string;
        };
    }): Promise<({
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
    findUserOrganizations(req: {
        user: {
            id: string;
        };
    }): Promise<({
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
    findOne(id: string, req: {
        user: {
            id: string;
        };
    }): Promise<{
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
    update(id: string, req: {
        user: {
            id: string;
        };
    }, dto: UpdateOrganizationDto): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        cnpj: string | null;
        ownerId: string;
    }>;
    remove(id: string, req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        cnpj: string | null;
        ownerId: string;
    }>;
    addMember(id: string, req: {
        user: {
            id: string;
        };
    }, dto: AddMemberDto): Promise<{
        id: string;
        role: string;
        organizationId: string;
        userId: string;
        joinedAt: Date;
    }>;
    removeMember(id: string, memberId: string, req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        role: string;
        organizationId: string;
        userId: string;
        joinedAt: Date;
    }>;
    getMembers(id: string, req: {
        user: {
            id: string;
        };
    }): Promise<({
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
