import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePetitionDto } from './dto/create-petition.dto';
import { UpdatePetitionDto } from './dto/update-petition.dto';
import { PetitionStatus } from '../../generated/prisma/client.js';
import { AuthMailerService } from '../auth/auth-mailer.service';

@Injectable()
export class PetitionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authMailerService: AuthMailerService,
  ) {}

  async create(userId: string, dto: CreatePetitionDto) {
    await this.checkPetitionLimit(userId);
    await this.checkPracticeArea(userId, dto.practiceArea);

    const petition = await this.prisma.petition.create({
      data: {
        ...dto,
        userId,
        status: PetitionStatus.ACTIVE,
      },
    });

    await this.incrementUsage(userId);

    return petition;
  }

  async saveDraft(userId: string, dto: CreatePetitionDto) {
    return this.prisma.petition.create({
      data: {
        ...dto,
        userId,
        status: PetitionStatus.DRAFT,
      },
    });
  }

  async activateDraft(id: string, userId: string) {
    const petition = await this.findOne(id, userId);

    if (petition.status !== PetitionStatus.DRAFT) {
      throw new BadRequestException('Apenas rascunhos podem ser ativados');
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
      if (!petition[field as keyof typeof petition]) {
        throw new BadRequestException(
          `Campo obrigatório '${field}' não preenchido`,
        );
      }
    }

    const updated = await this.prisma.petition.update({
      where: { id },
      data: { status: PetitionStatus.ACTIVE },
    });

    await this.incrementUsage(userId);

    return updated;
  }

  async findAllByUser(userId: string) {
    return this.prisma.petition.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findActive(userId: string) {
    return this.prisma.petition.findMany({
      where: { userId, status: PetitionStatus.ACTIVE },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findArchived(userId: string) {
    return this.prisma.petition.findMany({
      where: { userId, status: PetitionStatus.ARCHIVED },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findDrafts(userId: string) {
    return this.prisma.petition.findMany({
      where: { userId, status: PetitionStatus.DRAFT },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const petition = await this.prisma.petition.findUnique({
      where: { id },
    });
    if (!petition) {
      throw new NotFoundException('Petição não encontrada');
    }
    if (petition.userId !== userId) {
      throw new ForbiddenException('Acesso negado a esta petição');
    }
    return petition;
  }

  async update(id: string, userId: string, dto: UpdatePetitionDto) {
    await this.findOne(id, userId);
    return this.prisma.petition.update({
      where: { id },
      data: dto,
    });
  }

  async archive(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.petition.update({
      where: { id },
      data: { status: PetitionStatus.ARCHIVED },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.petition.delete({ where: { id } });
  }

  async addFavorite(userId: string, petitionId: string) {
    await this.findOne(petitionId, userId);

    const existing = await this.prisma.favorite.findUnique({
      where: { userId_petitionId: { userId, petitionId } },
    });
    if (existing) {
      throw new BadRequestException('Petição já está favoritada');
    }

    return this.prisma.favorite.create({
      data: { userId, petitionId },
    });
  }

  async removeFavorite(userId: string, petitionId: string) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_petitionId: { userId, petitionId } },
    });
    if (!existing) {
      throw new NotFoundException('Favorito não encontrado');
    }

    return this.prisma.favorite.delete({
      where: { userId_petitionId: { userId, petitionId } },
    });
  }

  async getFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { petition: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async canExportPdf(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { plan: true },
    });
    if (!user || !user.plan) return false;
    return user.plan.canExportPdf;
  }

  async canExportWord(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { plan: true },
    });
    if (!user || !user.plan) return false;
    return user.plan.canExportWord;
  }

  async downloadPdf(userId: string, petitionId: string) {
    const petition = await this.findGeneratedPetition(
      petitionId,
      userId,
      'baixar PDF',
    );

    const canExport = await this.canExportPdf(userId);
    if (!canExport) {
      throw new ForbiddenException(
        'Seu plano nao permite exportacao de PDF. Faca upgrade.',
      );
    }

    return {
      filename: `peticao-${petition.id}.pdf`,
      buffer: this.buildPetitionPdf(this.buildPetitionText(petition)),
    };
  }

  async sendPetitionMail(
    userId: string,
    petitionId: string,
    recipientEmail?: string,
  ) {
    const petition = await this.findGeneratedPetition(
      petitionId,
      userId,
      'enviadas por email',
    );
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

  async getUserPermissions(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { plan: true },
    });

    if (!user || !user.plan) {
      throw new NotFoundException('Usuário sem plano ativo');
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
    const remaining =
      user.plan.monthlyLimit !== null
        ? Math.max(0, user.plan.monthlyLimit - currentCount)
        : null;

    return {
      plan: {
        name: user.plan.name,
        type: user.plan.type,
      },
      permissions: {
        canCreatePetition:
          user.plan.monthlyLimit === null ||
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

  private async checkPracticeArea(userId: string, practiceArea?: string) {
    if (!practiceArea) return;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { plan: true },
    });

    if (!user || !user.plan) {
      throw new ForbiddenException('Usuário sem plano ativo');
    }

    if (
      user.plan.practiceAreas.length > 0 &&
      !user.plan.practiceAreas.includes(practiceArea)
    ) {
      throw new ForbiddenException(
        `Área de atuação '${practiceArea}' não está disponível no seu plano. Áreas permitidas: ${user.plan.practiceAreas.join(', ')}`,
      );
    }
  }

  private async checkPetitionLimit(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { plan: true },
    });

    if (!user || !user.plan) {
      throw new ForbiddenException('Usuário sem plano ativo');
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
      throw new ForbiddenException(
        `Limite mensal de ${user.plan.monthlyLimit} petições atingido. Faça upgrade do seu plano.`,
      );
    }
  }

  private async incrementUsage(userId: string) {
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
    } else {
      await this.prisma.petitionUsage.create({
        data: { userId, year, month, count: 1 },
      });
    }
  }

  private async findGeneratedPetition(
    id: string,
    userId: string,
    operation: string,
  ) {
    const petition = await this.findOne(id, userId);

    if (petition.status === PetitionStatus.DRAFT) {
      throw new BadRequestException(`Rascunhos nao podem ser ${operation}`);
    }

    return petition;
  }

  private normalizeRecipientEmail(email?: string) {
    const normalizedEmail = email?.trim().toLowerCase();

    if (
      !normalizedEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      throw new BadRequestException(
        'Informe um email valido para receber a peticao',
      );
    }

    return normalizedEmail;
  }

  private buildPetitionText(petition: {
    fullName: string;
    cpfCnpj: string;
    rg?: string | null;
    maritalStatus?: string | null;
    cep?: string | null;
    street?: string | null;
    defendantCompany: string;
    cnpj?: string | null;
    facts: string;
    requests: string;
    practiceArea?: string | null;
  }) {
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
      .filter((line): line is string => typeof line === 'string')
      .join('\n');
  }

  private buildPetitionPdf(content: string): Buffer {
    const lines = this.paginatePdfLines(content);
    const pages = this.chunk(lines, 50);
    const objects: Buffer[] = [];
    const pageObjectIds: number[] = [];
    const fontObjectId = 3;

    objects.push(this.pdfObject(1, '<< /Type /Catalog /Pages 2 0 R >>'));
    objects.push(Buffer.alloc(0));
    objects.push(
      this.pdfObject(
        fontObjectId,
        '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
      ),
    );

    let nextObjectId = 4;
    for (const pageLines of pages.length > 0 ? pages : [['']]) {
      const pageObjectId = nextObjectId++;
      const contentObjectId = nextObjectId++;
      pageObjectIds.push(pageObjectId);

      const stream = this.buildPdfTextStream(pageLines);
      objects.push(
        this.pdfObject(
          pageObjectId,
          `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>`,
        ),
      );
      objects.push(this.pdfStreamObject(contentObjectId, stream));
    }

    objects[1] = this.pdfObject(
      2,
      `<< /Type /Pages /Kids [${pageObjectIds
        .map((id) => `${id} 0 R`)
        .join(' ')}] /Count ${pageObjectIds.length} >>`,
    );

    return this.assemblePdf(objects);
  }

  private paginatePdfLines(content: string): string[] {
    return content
      .replace(/\r\n/g, '\n')
      .split('\n')
      .flatMap((paragraph) => this.wrapPdfLine(paragraph.trimEnd(), 88));
  }

  private wrapPdfLine(line: string, maxLength: number): string[] {
    if (!line) return [''];

    const words = line.split(/\s+/);
    const lines: string[] = [];
    let current = '';

    for (const word of words) {
      if (!current) {
        current = word;
        continue;
      }

      if (`${current} ${word}`.length > maxLength) {
        lines.push(current);
        current = word;
      } else {
        current = `${current} ${word}`;
      }
    }

    if (current) lines.push(current);
    return lines;
  }

  private buildPdfTextStream(lines: string[]): Buffer {
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

  private escapePdfText(text: string): string {
    return this.toWinAnsi(text)
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  }

  private toWinAnsi(text: string): string {
    const replacements: Record<string, string> = {
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
        if (replacements[char]) return replacements[char];
        return char.charCodeAt(0) <= 255 ? char : '?';
      })
      .join('');
  }

  private pdfObject(id: number, body: string): Buffer {
    return Buffer.from(`${id} 0 obj\n${body}\nendobj\n`, 'latin1');
  }

  private pdfStreamObject(id: number, stream: Buffer): Buffer {
    return Buffer.concat([
      Buffer.from(
        `${id} 0 obj\n<< /Length ${stream.length} >>\nstream\n`,
        'latin1',
      ),
      stream,
      Buffer.from('\nendstream\nendobj\n', 'latin1'),
    ]);
  }

  private assemblePdf(objects: Buffer[]): Buffer {
    const header = Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'binary');
    const offsets: number[] = [];
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
      ...offsets.map(
        (offset) => `${offset.toString().padStart(10, '0')} 00000 n `,
      ),
      'trailer',
      `<< /Size ${objects.length + 1} /Root 1 0 R >>`,
      'startxref',
      `${xrefOffset}`,
      '%%EOF',
    ].join('\n');

    return Buffer.concat([header, body, Buffer.from(xrefLines, 'latin1')]);
  }

  private chunk<T>(items: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let index = 0; index < items.length; index += size) {
      chunks.push(items.slice(index, index + size));
    }
    return chunks;
  }
}
