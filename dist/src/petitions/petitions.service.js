"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetitionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_js_1 = require("../../generated/prisma/client.js");
let PetitionsService = class PetitionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        await this.checkPetitionLimit(userId);
        await this.checkPracticeArea(userId, dto.practiceArea);
        const petition = await this.prisma.petition.create({
            data: {
                ...dto,
                userId,
                status: client_js_1.PetitionStatus.ACTIVE,
            },
        });
        await this.incrementUsage(userId);
        return petition;
    }
    async saveDraft(userId, dto) {
        return this.prisma.petition.create({
            data: {
                ...dto,
                userId,
                status: client_js_1.PetitionStatus.DRAFT,
            },
        });
    }
    async activateDraft(id, userId) {
        const petition = await this.findOne(id, userId);
        if (petition.status !== client_js_1.PetitionStatus.DRAFT) {
            throw new common_1.BadRequestException('Apenas rascunhos podem ser ativados');
        }
        await this.checkPetitionLimit(userId);
        await this.checkPracticeArea(userId, petition.practiceArea ?? undefined);
        const requiredFields = [
            'fullName',
            'cpfCnpj',
            'defendantCompany',
            'facts',
            'requests',
        ];
        for (const field of requiredFields) {
            if (!petition[field]) {
                throw new common_1.BadRequestException(`Campo obrigatório '${field}' não preenchido`);
            }
        }
        const updated = await this.prisma.petition.update({
            where: { id },
            data: { status: client_js_1.PetitionStatus.ACTIVE },
        });
        await this.incrementUsage(userId);
        return updated;
    }
    async findAllByUser(userId) {
        return this.prisma.petition.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findActive(userId) {
        return this.prisma.petition.findMany({
            where: { userId, status: client_js_1.PetitionStatus.ACTIVE },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findArchived(userId) {
        return this.prisma.petition.findMany({
            where: { userId, status: client_js_1.PetitionStatus.ARCHIVED },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findDrafts(userId) {
        return this.prisma.petition.findMany({
            where: { userId, status: client_js_1.PetitionStatus.DRAFT },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId) {
        const petition = await this.prisma.petition.findUnique({
            where: { id },
        });
        if (!petition) {
            throw new common_1.NotFoundException('Petição não encontrada');
        }
        if (petition.userId !== userId) {
            throw new common_1.ForbiddenException('Acesso negado a esta petição');
        }
        return petition;
    }
    async update(id, userId, dto) {
        await this.findOne(id, userId);
        return this.prisma.petition.update({
            where: { id },
            data: dto,
        });
    }
    async archive(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.petition.update({
            where: { id },
            data: { status: client_js_1.PetitionStatus.ARCHIVED },
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.petition.delete({ where: { id } });
    }
    async addFavorite(userId, petitionId) {
        await this.findOne(petitionId, userId);
        const existing = await this.prisma.favorite.findUnique({
            where: { userId_petitionId: { userId, petitionId } },
        });
        if (existing) {
            throw new common_1.BadRequestException('Petição já está favoritada');
        }
        return this.prisma.favorite.create({
            data: { userId, petitionId },
        });
    }
    async removeFavorite(userId, petitionId) {
        const existing = await this.prisma.favorite.findUnique({
            where: { userId_petitionId: { userId, petitionId } },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Favorito não encontrado');
        }
        return this.prisma.favorite.delete({
            where: { userId_petitionId: { userId, petitionId } },
        });
    }
    async getFavorites(userId) {
        return this.prisma.favorite.findMany({
            where: { userId },
            include: { petition: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async canExportPdf(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { plan: true },
        });
        if (!user || !user.plan)
            return false;
        return user.plan.canExportPdf;
    }
    async canExportWord(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { plan: true },
        });
        if (!user || !user.plan)
            return false;
        return user.plan.canExportWord;
    }
    async getUserPermissions(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { plan: true },
        });
        if (!user || !user.plan) {
            throw new common_1.NotFoundException('Usuário sem plano ativo');
        }
        const now = new Date();
        const usage = await this.prisma.petitionUsage.findUnique({
            where: {
                userId_year_month: {
                    userId,
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                },
            },
        });
        const currentCount = usage?.count ?? 0;
        const remaining = user.plan.monthlyLimit !== null
            ? Math.max(0, user.plan.monthlyLimit - currentCount)
            : null;
        return {
            plan: {
                name: user.plan.name,
                type: user.plan.type,
            },
            permissions: {
                canCreatePetition: user.plan.monthlyLimit === null ||
                    currentCount < user.plan.monthlyLimit,
                canExportPdf: user.plan.canExportPdf,
                canExportWord: user.plan.canExportWord,
                canAccessDashboard: user.plan.hasDashboard,
                canAccessFullHistory: user.plan.hasFullHistory,
                canAccessExpandedLibrary: user.plan.hasExpandedLibrary,
                canUseCustomTemplates: user.plan.hasCustomTemplates,
                hasRealTimePreview: user.plan.hasRealTimePreview,
                hasBasicEditor: user.plan.hasBasicEditor,
                hasPriority: user.plan.hasPriority,
            },
            usage: {
                current: currentCount,
                limit: user.plan.monthlyLimit,
                remaining,
            },
            allowedPracticeAreas: user.plan.practiceAreas,
        };
    }
    async checkPracticeArea(userId, practiceArea) {
        if (!practiceArea)
            return;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { plan: true },
        });
        if (!user || !user.plan) {
            throw new common_1.ForbiddenException('Usuário sem plano ativo');
        }
        if (user.plan.practiceAreas.length > 0 &&
            !user.plan.practiceAreas.includes(practiceArea)) {
            throw new common_1.ForbiddenException(`Área de atuação '${practiceArea}' não está disponível no seu plano. Áreas permitidas: ${user.plan.practiceAreas.join(', ')}`);
        }
    }
    async checkPetitionLimit(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { plan: true },
        });
        if (!user || !user.plan) {
            throw new common_1.ForbiddenException('Usuário sem plano ativo');
        }
        if (user.plan.monthlyLimit === null) {
            return;
        }
        const now = new Date();
        const usage = await this.prisma.petitionUsage.findUnique({
            where: {
                userId_year_month: {
                    userId,
                    year: now.getFullYear(),
                    month: now.getMonth() + 1,
                },
            },
        });
        const currentCount = usage?.count ?? 0;
        if (currentCount >= user.plan.monthlyLimit) {
            throw new common_1.ForbiddenException(`Limite mensal de ${user.plan.monthlyLimit} petições atingido. Faça upgrade do seu plano.`);
        }
    }
    async incrementUsage(userId) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const existing = await this.prisma.petitionUsage.findUnique({
            where: { userId_year_month: { userId, year, month } },
        });
        if (existing) {
            await this.prisma.petitionUsage.update({
                where: { id: existing.id },
                data: { count: { increment: 1 } },
            });
        }
        else {
            await this.prisma.petitionUsage.create({
                data: { userId, year, month, count: 1 },
            });
        }
    }
};
exports.PetitionsService = PetitionsService;
exports.PetitionsService = PetitionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PetitionsService);
//# sourceMappingURL=petitions.service.js.map