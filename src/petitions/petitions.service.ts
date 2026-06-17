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

@Injectable()
export class PetitionsService {
  constructor(private readonly prisma: PrismaService) {}

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
}
