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
exports.TemplatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TemplatesService = class TemplatesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.petitionTemplate.create({ data: dto });
    }
    async findAll() {
        return this.prisma.petitionTemplate.findMany({
            orderBy: { category: 'asc' },
        });
    }
    async findPublic() {
        return this.prisma.petitionTemplate.findMany({
            where: { isPublic: true },
            orderBy: { category: 'asc' },
        });
    }
    async findByPlan(planId) {
        return this.prisma.petitionTemplate.findMany({
            where: {
                OR: [{ isPublic: true }, { planId }],
            },
            orderBy: { category: 'asc' },
        });
    }
    async findOne(id) {
        const template = await this.prisma.petitionTemplate.findUnique({
            where: { id },
        });
        if (!template) {
            throw new common_1.NotFoundException('Template não encontrado');
        }
        return template;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.petitionTemplate.update({ where: { id }, data: dto });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.petitionTemplate.delete({ where: { id } });
    }
    async getAvailableForUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { plan: true },
        });
        if (!user || !user.plan) {
            throw new common_1.ForbiddenException('Usuário sem plano ativo');
        }
        if (!user.plan.hasExpandedLibrary && !user.plan.hasCustomTemplates) {
            return this.prisma.petitionTemplate.findMany({
                where: { isPublic: true },
                orderBy: { category: 'asc' },
            });
        }
        return this.prisma.petitionTemplate.findMany({
            where: {
                OR: [{ isPublic: true }, { planId: user.planId }],
            },
            orderBy: { category: 'asc' },
        });
    }
};
exports.TemplatesService = TemplatesService;
exports.TemplatesService = TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TemplatesService);
//# sourceMappingURL=templates.service.js.map