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
const auth_mailer_service_1 = require("../auth/auth-mailer.service");
let PetitionsService = class PetitionsService {
    prisma;
    authMailerService;
    constructor(prisma, authMailerService) {
        this.prisma = prisma;
        this.authMailerService = authMailerService;
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
    async downloadPdf(userId, petitionId) {
        const petition = await this.findGeneratedPetition(petitionId, userId, 'baixar PDF');
        const canExport = await this.canExportPdf(userId);
        if (!canExport) {
            throw new common_1.ForbiddenException('Seu plano nao permite exportacao de PDF. Faca upgrade.');
        }
        return {
            filename: `peticao-${petition.id}.pdf`,
            buffer: this.buildPetitionPdf(this.buildPetitionText(petition)),
        };
    }
    async sendPetitionMail(userId, petitionId, recipientEmail) {
        const petition = await this.findGeneratedPetition(petitionId, userId, 'enviadas por email');
        const to = this.normalizeRecipientEmail(recipientEmail);
        const filename = `peticao-${petition.id}.pdf`;
        await this.authMailerService.sendPetitionPdfEmail({
            to,
            petitionId: petition.id,
            pdfFilename: filename,
            pdfBuffer: this.buildPetitionPdf(this.buildPetitionText(petition)),
        });
        return {
            petitionId: petition.id,
            recipientEmail: to,
            status: 'SENT',
            message: 'Peticao enviada por email com sucesso',
        };
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
    async findGeneratedPetition(id, userId, operation) {
        const petition = await this.findOne(id, userId);
        if (petition.status === client_js_1.PetitionStatus.DRAFT) {
            throw new common_1.BadRequestException(`Rascunhos nao podem ser ${operation}`);
        }
        return petition;
    }
    normalizeRecipientEmail(email) {
        const normalizedEmail = email?.trim().toLowerCase();
        if (!normalizedEmail ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            throw new common_1.BadRequestException('Informe um email valido para receber a peticao');
        }
        return normalizedEmail;
    }
    buildPetitionText(petition) {
        return [
            'PETICAO',
            '',
            petition.practiceArea && `Area: ${petition.practiceArea}`,
            `Requerente: ${petition.fullName}`,
            `CPF/CNPJ: ${petition.cpfCnpj}`,
            petition.rg && `RG: ${petition.rg}`,
            petition.maritalStatus && `Estado civil: ${petition.maritalStatus}`,
            petition.cep && `CEP: ${petition.cep}`,
            petition.street && `Endereco: ${petition.street}`,
            '',
            `Parte requerida: ${petition.defendantCompany}`,
            petition.cnpj && `CNPJ: ${petition.cnpj}`,
            '',
            'Fatos',
            petition.facts,
            '',
            'Pedidos',
            petition.requests,
        ]
            .filter((line) => typeof line === 'string')
            .join('\n');
    }
    buildPetitionPdf(content) {
        const lines = this.paginatePdfLines(content);
        const pages = this.chunk(lines, 50);
        const objects = [];
        const pageObjectIds = [];
        const fontObjectId = 3;
        objects.push(this.pdfObject(1, '<< /Type /Catalog /Pages 2 0 R >>'));
        objects.push(Buffer.alloc(0));
        objects.push(this.pdfObject(fontObjectId, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'));
        let nextObjectId = 4;
        for (const pageLines of pages.length > 0 ? pages : [['']]) {
            const pageObjectId = nextObjectId++;
            const contentObjectId = nextObjectId++;
            pageObjectIds.push(pageObjectId);
            const stream = this.buildPdfTextStream(pageLines);
            objects.push(this.pdfObject(pageObjectId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>`));
            objects.push(this.pdfStreamObject(contentObjectId, stream));
        }
        objects[1] = this.pdfObject(2, `<< /Type /Pages /Kids [${pageObjectIds
            .map((id) => `${id} 0 R`)
            .join(' ')}] /Count ${pageObjectIds.length} >>`);
        return this.assemblePdf(objects);
    }
    paginatePdfLines(content) {
        return content
            .replace(/\r\n/g, '\n')
            .split('\n')
            .flatMap((paragraph) => this.wrapPdfLine(paragraph.trimEnd(), 88));
    }
    wrapPdfLine(line, maxLength) {
        if (!line)
            return [''];
        const words = line.split(/\s+/);
        const lines = [];
        let current = '';
        for (const word of words) {
            if (!current) {
                current = word;
                continue;
            }
            if (`${current} ${word}`.length > maxLength) {
                lines.push(current);
                current = word;
            }
            else {
                current = `${current} ${word}`;
            }
        }
        if (current)
            lines.push(current);
        return lines;
    }
    buildPdfTextStream(lines) {
        const commands = [
            'BT',
            '/F1 12 Tf',
            '72 770 Td',
            '15 TL',
            ...lines.map((line, index) => {
                const command = `(${this.escapePdfText(line)}) Tj`;
                return index === lines.length - 1 ? command : `${command} T*`;
            }),
            'ET',
        ].join('\n');
        return Buffer.from(commands, 'latin1');
    }
    escapePdfText(text) {
        return this.toWinAnsi(text)
            .replace(/\\/g, '\\\\')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)');
    }
    toWinAnsi(text) {
        const replacements = {
            '\u2013': '-',
            '\u2014': '-',
            '\u2018': "'",
            '\u2019': "'",
            '\u201c': '"',
            '\u201d': '"',
            '\u2022': '-',
            '\u00a0': ' ',
        };
        return Array.from(text)
            .map((char) => {
            if (replacements[char])
                return replacements[char];
            return char.charCodeAt(0) <= 255 ? char : '?';
        })
            .join('');
    }
    pdfObject(id, body) {
        return Buffer.from(`${id} 0 obj\n${body}\nendobj\n`, 'latin1');
    }
    pdfStreamObject(id, stream) {
        return Buffer.concat([
            Buffer.from(`${id} 0 obj\n<< /Length ${stream.length} >>\nstream\n`, 'latin1'),
            stream,
            Buffer.from('\nendstream\nendobj\n', 'latin1'),
        ]);
    }
    assemblePdf(objects) {
        const header = Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'binary');
        const offsets = [];
        let cursor = header.length;
        for (const object of objects) {
            offsets.push(cursor);
            cursor += object.length;
        }
        const body = Buffer.concat(objects);
        const xrefOffset = header.length + body.length;
        const xrefLines = [
            'xref',
            `0 ${objects.length + 1}`,
            '0000000000 65535 f ',
            ...offsets.map((offset) => `${offset.toString().padStart(10, '0')} 00000 n `),
            'trailer',
            `<< /Size ${objects.length + 1} /Root 1 0 R >>`,
            'startxref',
            `${xrefOffset}`,
            '%%EOF',
        ].join('\n');
        return Buffer.concat([header, body, Buffer.from(xrefLines, 'latin1')]);
    }
    chunk(items, size) {
        const chunks = [];
        for (let index = 0; index < items.length; index += size) {
            chunks.push(items.slice(index, index + size));
        }
        return chunks;
    }
};
exports.PetitionsService = PetitionsService;
exports.PetitionsService = PetitionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auth_mailer_service_1.AuthMailerService])
], PetitionsService);
//# sourceMappingURL=petitions.service.js.map