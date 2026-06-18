import { StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { CreatePetitionDto } from './dto/create-petition.dto';
import { SendPetitionMailDto } from './dto/send-petition-mail.dto';
import { UpdatePetitionDto } from './dto/update-petition.dto';
import { PetitionsService } from './petitions.service';
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
    sendPetitionMailByBody(req: {
        user: {
            id: string;
        };
    }, dto: SendPetitionMailDto): Promise<{
        petitionId: string;
        recipientEmail: string;
        status: string;
        message: string;
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
    downloadPdf(id: string, req: {
        user: {
            id: string;
        };
    }, response: Response): Promise<StreamableFile>;
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
    sendPetitionMail(id: string, req: {
        user: {
            id: string;
        };
    }, dto: SendPetitionMailDto): Promise<{
        petitionId: string;
        recipientEmail: string;
        status: string;
        message: string;
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
    private resolveRecipientEmail;
}
