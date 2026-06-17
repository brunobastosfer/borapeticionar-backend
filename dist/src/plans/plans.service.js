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
exports.PlansService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_js_1 = require("../../generated/prisma/client.js");
let PlansService = class PlansService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.plan.create({ data: dto });
    }
    async findAll() {
        return this.prisma.plan.findMany({
            orderBy: { price: 'asc' },
        });
    }
    async findAvailable() {
        return this.prisma.plan.findMany({
            where: { isAvailable: true },
            orderBy: { price: 'asc' },
        });
    }
    async findOne(id) {
        const plan = await this.prisma.plan.findUnique({ where: { id } });
        if (!plan) {
            throw new common_1.NotFoundException('Plano não encontrado');
        }
        return plan;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.plan.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.plan.delete({ where: { id } });
    }
    async subscribe(userId, planId) {
        const plan = await this.findOne(planId);
        if (!plan.isAvailable) {
            throw new common_1.ForbiddenException('Este plano ainda não está disponível');
        }
        const newRole = plan.type === client_js_1.PlanType.OFFICE ? client_js_1.Role.COMPANY : client_js_1.Role.USER;
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: { planId: plan.id, role: newRole },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                institutionalEmail: true,
                role: true,
                plan: true,
            },
        });
        if (plan.type !== client_js_1.PlanType.OFFICE) {
            await this.downgradeLinkedUsers(userId);
        }
        return updatedUser;
    }
    async getUsage(userId) {
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
        return {
            plan: user.plan,
            currentMonth: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                used: usage?.count ?? 0,
                limit: user.plan.monthlyLimit,
                remaining: user.plan.monthlyLimit !== null
                    ? Math.max(0, user.plan.monthlyLimit - (usage?.count ?? 0))
                    : null,
            },
        };
    }
    async linkUser(companyUserId, linkedUserId) {
        const companyUser = await this.prisma.user.findUnique({
            where: { id: companyUserId },
            include: { plan: true, linkedUsers: true },
        });
        if (!companyUser || companyUser.role !== client_js_1.Role.COMPANY) {
            throw new common_1.ForbiddenException('Apenas usuários com plano Escritório podem vincular usuários');
        }
        if (companyUser.linkedUsers.length >= 2) {
            throw new common_1.BadRequestException('Limite de 2 usuários vinculados atingido');
        }
        const linkedUser = await this.prisma.user.findUnique({
            where: { id: linkedUserId },
        });
        if (!linkedUser) {
            throw new common_1.NotFoundException('Usuário a ser vinculado não encontrado');
        }
        if (linkedUser.linkedToId) {
            throw new common_1.BadRequestException('Usuário já está vinculado a outro usuário');
        }
        return this.prisma.user.update({
            where: { id: linkedUserId },
            data: {
                linkedToId: companyUserId,
                planId: companyUser.planId,
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                institutionalEmail: true,
                plan: true,
            },
        });
    }
    async unlinkUser(companyUserId, linkedUserId) {
        const companyUser = await this.prisma.user.findUnique({
            where: { id: companyUserId },
            include: { linkedUsers: true },
        });
        if (!companyUser || companyUser.role !== client_js_1.Role.COMPANY) {
            throw new common_1.ForbiddenException('Apenas usuários com plano Escritório podem desvincular usuários');
        }
        const linkedUser = companyUser.linkedUsers.find((u) => u.id === linkedUserId);
        if (!linkedUser) {
            throw new common_1.NotFoundException('Usuário não está vinculado a você');
        }
        const freePlan = await this.prisma.plan.findUnique({
            where: { type: client_js_1.PlanType.FREE },
        });
        return this.prisma.user.update({
            where: { id: linkedUserId },
            data: {
                linkedToId: null,
                planId: freePlan?.id || null,
            },
        });
    }
    async getLinkedUsers(companyUserId) {
        const user = await this.prisma.user.findUnique({
            where: { id: companyUserId },
            include: {
                linkedUsers: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        institutionalEmail: true,
                        plan: true,
                    },
                },
            },
        });
        if (!user || user.role !== client_js_1.Role.COMPANY) {
            throw new common_1.ForbiddenException('Apenas usuários com plano Escritório podem ver usuários vinculados');
        }
        return user.linkedUsers;
    }
    async downgradeLinkedUsers(companyUserId) {
        const freePlan = await this.prisma.plan.findUnique({
            where: { type: client_js_1.PlanType.FREE },
        });
        await this.prisma.user.updateMany({
            where: { linkedToId: companyUserId },
            data: { planId: freePlan?.id || null },
        });
    }
};
exports.PlansService = PlansService;
exports.PlansService = PlansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlansService);
//# sourceMappingURL=plans.service.js.map