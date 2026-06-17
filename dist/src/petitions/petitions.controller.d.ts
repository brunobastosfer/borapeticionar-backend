import { PetitionsService } from './petitions.service';
import { CreatePetitionDto } from './dto/create-petition.dto';
import { UpdatePetitionDto } from './dto/update-petition.dto';
export declare class PetitionsController {
    private readonly petitionsService;
    constructor(petitionsService: PetitionsService);
    create(req: {
        user: {
            id: string;
        };
    }, dto: CreatePetitionDto): Promise<{
        id: string;
        practiceArea: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        font: string | null;
        textColor: string | null;
        fullName: string;
        cpfCnpj: string;
        rg: string | null;
        maritalStatus: string | null;
        cep: string | null;
        street: string | null;
        defendantCompany: string;
        cnpj: string | null;
        facts: string;
        requests: string;
        status: import("../../generated/prisma/enums").PetitionStatus;
    }>;
    saveDraft(req: {
        user: {
            id: string;
        };
    }, dto: CreatePetitionDto): Promise<{
        id: string;
        practiceArea: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        font: string | null;
        textColor: string | null;
        fullName: string;
        cpfCnpj: string;
        rg: string | null;
        maritalStatus: string | null;
        cep: string | null;
        street: string | null;
        defendantCompany: string;
        cnpj: string | null;
        facts: string;
        requests: string;
        status: import("../../generated/prisma/enums").PetitionStatus;
    }>;
    activateDraft(id: string, req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        practiceArea: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        font: string | null;
        textColor: string | null;
        fullName: string;
        cpfCnpj: string;
        rg: string | null;
        maritalStatus: string | null;
        cep: string | null;
        street: string | null;
        defendantCompany: string;
        cnpj: string | null;
        facts: string;
        requests: string;
        status: import("../../generated/prisma/enums").PetitionStatus;
    }>;
    findAll(req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        practiceArea: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        font: string | null;
        textColor: string | null;
        fullName: string;
        cpfCnpj: string;
        rg: string | null;
        maritalStatus: string | null;
        cep: string | null;
        street: string | null;
        defendantCompany: string;
        cnpj: string | null;
        facts: string;
        requests: string;
        status: import("../../generated/prisma/enums").PetitionStatus;
    }[]>;
    findActive(req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        practiceArea: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        font: string | null;
        textColor: string | null;
        fullName: string;
        cpfCnpj: string;
        rg: string | null;
        maritalStatus: string | null;
        cep: string | null;
        street: string | null;
        defendantCompany: string;
        cnpj: string | null;
        facts: string;
        requests: string;
        status: import("../../generated/prisma/enums").PetitionStatus;
    }[]>;
    findArchived(req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        practiceArea: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        font: string | null;
        textColor: string | null;
        fullName: string;
        cpfCnpj: string;
        rg: string | null;
        maritalStatus: string | null;
        cep: string | null;
        street: string | null;
        defendantCompany: string;
        cnpj: string | null;
        facts: string;
        requests: string;
        status: import("../../generated/prisma/enums").PetitionStatus;
    }[]>;
    findDrafts(req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        practiceArea: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        font: string | null;
        textColor: string | null;
        fullName: string;
        cpfCnpj: string;
        rg: string | null;
        maritalStatus: string | null;
        cep: string | null;
        street: string | null;
        defendantCompany: string;
        cnpj: string | null;
        facts: string;
        requests: string;
        status: import("../../generated/prisma/enums").PetitionStatus;
    }[]>;
    getFavorites(req: {
        user: {
            id: string;
        };
    }): Promise<({
        petition: {
            id: string;
            practiceArea: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            font: string | null;
            textColor: string | null;
            fullName: string;
            cpfCnpj: string;
            rg: string | null;
            maritalStatus: string | null;
            cep: string | null;
            street: string | null;
            defendantCompany: string;
            cnpj: string | null;
            facts: string;
            requests: string;
            status: import("../../generated/prisma/enums").PetitionStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        petitionId: string;
    })[]>;
    findOne(id: string, req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        practiceArea: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        font: string | null;
        textColor: string | null;
        fullName: string;
        cpfCnpj: string;
        rg: string | null;
        maritalStatus: string | null;
        cep: string | null;
        street: string | null;
        defendantCompany: string;
        cnpj: string | null;
        facts: string;
        requests: string;
        status: import("../../generated/prisma/enums").PetitionStatus;
    }>;
    update(id: string, req: {
        user: {
            id: string;
        };
    }, dto: UpdatePetitionDto): Promise<{
        id: string;
        practiceArea: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        font: string | null;
        textColor: string | null;
        fullName: string;
        cpfCnpj: string;
        rg: string | null;
        maritalStatus: string | null;
        cep: string | null;
        street: string | null;
        defendantCompany: string;
        cnpj: string | null;
        facts: string;
        requests: string;
        status: import("../../generated/prisma/enums").PetitionStatus;
    }>;
    archive(id: string, req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        practiceArea: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        font: string | null;
        textColor: string | null;
        fullName: string;
        cpfCnpj: string;
        rg: string | null;
        maritalStatus: string | null;
        cep: string | null;
        street: string | null;
        defendantCompany: string;
        cnpj: string | null;
        facts: string;
        requests: string;
        status: import("../../generated/prisma/enums").PetitionStatus;
    }>;
    remove(id: string, req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        practiceArea: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        font: string | null;
        textColor: string | null;
        fullName: string;
        cpfCnpj: string;
        rg: string | null;
        maritalStatus: string | null;
        cep: string | null;
        street: string | null;
        defendantCompany: string;
        cnpj: string | null;
        facts: string;
        requests: string;
        status: import("../../generated/prisma/enums").PetitionStatus;
    }>;
    addFavorite(id: string, req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        petitionId: string;
    }>;
    removeFavorite(id: string, req: {
        user: {
            id: string;
        };
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        petitionId: string;
    }>;
    canExport(_id: string, req: {
        user: {
            id: string;
        };
    }): Promise<{
        canExport: boolean;
    }>;
    canExportWord(_id: string, req: {
        user: {
            id: string;
        };
    }): Promise<{
        canExport: boolean;
    }>;
    getPermissions(req: {
        user: {
            id: string;
        };
    }): Promise<{
        plan: {
            name: string;
            type: import("../../generated/prisma/enums").PlanType;
        };
        permissions: {
            canCreatePetition: boolean;
            canExportPdf: boolean;
            canExportWord: boolean;
            canAccessDashboard: boolean;
            canAccessFullHistory: boolean;
            canAccessExpandedLibrary: boolean;
            canUseCustomTemplates: boolean;
            hasRealTimePreview: boolean;
            hasBasicEditor: boolean;
            hasPriority: boolean;
        };
        usage: {
            current: number;
            limit: number | null;
            remaining: number | null;
        };
        allowedPracticeAreas: string[];
    }>;
}
