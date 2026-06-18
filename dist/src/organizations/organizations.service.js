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
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrganizationsService = class OrganizationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { plan: true },
        });
        if (!user || !user.plan) {
            throw new common_1.ForbiddenException('Usuário sem plano ativo');
        }
        if (!user.plan.isMultiUser) {
            throw new common_1.ForbiddenException('Seu plano não permite criação de organizações. Faça upgrade para o plano Escritório.');
        }
        const organization = await this.prisma.organization.create({
            data: {
                ...dto,
                ownerId: userId,
                planId: dto.planId || user.planId,
            },
        });
        await this.prisma.organizationMember.create({
            data: {
                organizationId: organization.id,
                userId,
                role: 'owner',
            },
        });
        return organization;
    }
    async findByOwner(userId) {
        return this.prisma.organization.findMany({
            where: { ownerId: userId },
            include: { members: { include: { user: true } }, plan: true },
        });
    }
    async findUserOrganizations(userId) {
        return this.prisma.organizationMember.findMany({
            where: { userId },
            include: { organization: { include: { plan: true } } },
        });
    }
    async findOne(id, userId) {
        const organization = await this.prisma.organization.findUnique({
            where: { id },
            include: { members: true, plan: true },
        });
        if (!organization) {
            throw new common_1.NotFoundException('Organização não encontrada');
        }
        const isMember = organization.members.some((m) => m.userId === userId);
        if (!isMember) {
            throw new common_1.ForbiddenException('Você não é membro desta organização');
        }
        return organization;
    }
    async update(id, userId, dto) {
        const organization = await this.findOne(id, userId);
        if (organization.ownerId !== userId) {
            throw new common_1.ForbiddenException('Apenas o proprietário pode editar a organização');
        }
        return this.prisma.organization.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id, userId) {
        const organization = await this.findOne(id, userId);
        if (organization.ownerId !== userId) {
            throw new common_1.ForbiddenException('Apenas o proprietário pode excluir a organização');
        }
        return this.prisma.organization.delete({ where: { id } });
    }
    async addMember(organizationId, userId, memberUserId, role = 'member') {
        const organization = await this.findOne(organizationId, userId);
        const member = organization.members.find((m) => m.userId === userId);
        if (!member || !['owner', 'admin'].includes(member.role)) {
            throw new common_1.ForbiddenException('Apenas proprietários ou administradores podem adicionar membros');
        }
        const existingMember = organization.members.find((m) => m.userId === memberUserId);
        if (existingMember) {
            throw new common_1.ConflictException('Usuário já é membro desta organização');
        }
        return this.prisma.organizationMember.create({
            data: {
                organizationId,
                userId: memberUserId,
                role,
            },
        });
    }
    async removeMember(organizationId, userId, memberUserId) {
        const organization = await this.findOne(organizationId, userId);
        const member = organization.members.find((m) => m.userId === userId);
        if (!member || !['owner', 'admin'].includes(member.role)) {
            throw new common_1.ForbiddenException('Apenas proprietários ou administradores podem remover membros');
        }
        const targetMember = organization.members.find((m) => m.userId === memberUserId);
        if (!targetMember) {
            throw new common_1.NotFoundException('Membro não encontrado');
        }
        if (targetMember.role === 'owner') {
            throw new common_1.ForbiddenException('Não é possível remover o proprietário');
        }
        return this.prisma.organizationMember.delete({
            where: {
                organizationId_userId: {
                    organizationId,
                    userId: memberUserId,
                },
            },
        });
    }
    async getMembers(organizationId, userId) {
        await this.findOne(organizationId, userId);
        return this.prisma.organizationMember.findMany({
            where: { organizationId },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        institutionalEmail: true,
                    },
                },
            },
        });
    }
};
exports.OrganizationsService = OrganizationsService;
exports.OrganizationsService = OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrganizationsService);
//# sourceMappingURL=organizations.service.js.map