import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
export declare class TemplatesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTemplateDto): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        content: string;
        category: string;
        isPublic: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        content: string;
        category: string;
        isPublic: boolean;
    }[]>;
    findPublic(): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        content: string;
        category: string;
        isPublic: boolean;
    }[]>;
    findByPlan(planId: string): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        content: string;
        category: string;
        isPublic: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        content: string;
        category: string;
        isPublic: boolean;
    }>;
    update(id: string, dto: UpdateTemplateDto): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        content: string;
        category: string;
        isPublic: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        content: string;
        category: string;
        isPublic: boolean;
    }>;
    getAvailableForUser(userId: string): Promise<{
        id: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        content: string;
        category: string;
        isPublic: boolean;
    }[]>;
}
