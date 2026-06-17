import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanType, Role } from '../../generated/prisma/client.js';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePlanDto) {
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

  async findOne(id: string) {
    const plan = await this.prisma.plan.findUnique({ where: { id } });
    if (!plan) {
      throw new NotFoundException('Plano não encontrado');
    }
    return plan;
  }

  async update(id: string, dto: UpdatePlanDto) {
    await this.findOne(id);
    return this.prisma.plan.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.plan.delete({ where: { id } });
  }

  async subscribe(userId: string, planId: string) {
    const plan = await this.findOne(planId);

    if (!plan.isAvailable) {
      throw new ForbiddenException('Este plano ainda não está disponível');
    }

    const newRole = plan.type === PlanType.OFFICE ? Role.COMPANY : Role.USER;

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

    if (plan.type !== PlanType.OFFICE) {
      await this.downgradeLinkedUsers(userId);
    }

    return updatedUser;
  }

  async getUsage(userId: string) {
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

    return {
      plan: user.plan,
      currentMonth: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        used: usage?.count ?? 0,
        limit: user.plan.monthlyLimit,
        remaining:
          user.plan.monthlyLimit !== null
            ? Math.max(0, user.plan.monthlyLimit - (usage?.count ?? 0))
            : null,
      },
    };
  }

  async linkUser(companyUserId: string, linkedUserId: string) {
    const companyUser = await this.prisma.user.findUnique({
      where: { id: companyUserId },
      include: { plan: true, linkedUsers: true },
    });

    if (!companyUser || companyUser.role !== Role.COMPANY) {
      throw new ForbiddenException(
        'Apenas usuários com plano Escritório podem vincular usuários',
      );
    }

    if (companyUser.linkedUsers.length >= 2) {
      throw new BadRequestException('Limite de 2 usuários vinculados atingido');
    }

    const linkedUser = await this.prisma.user.findUnique({
      where: { id: linkedUserId },
    });

    if (!linkedUser) {
      throw new NotFoundException('Usuário a ser vinculado não encontrado');
    }

    if (linkedUser.linkedToId) {
      throw new BadRequestException(
        'Usuário já está vinculado a outro usuário',
      );
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

  async unlinkUser(companyUserId: string, linkedUserId: string) {
    const companyUser = await this.prisma.user.findUnique({
      where: { id: companyUserId },
      include: { linkedUsers: true },
    });

    if (!companyUser || companyUser.role !== Role.COMPANY) {
      throw new ForbiddenException(
        'Apenas usuários com plano Escritório podem desvincular usuários',
      );
    }

    const linkedUser = companyUser.linkedUsers.find(
      (u) => u.id === linkedUserId,
    );
    if (!linkedUser) {
      throw new NotFoundException('Usuário não está vinculado a você');
    }

    const freePlan = await this.prisma.plan.findUnique({
      where: { type: PlanType.FREE },
    });

    return this.prisma.user.update({
      where: { id: linkedUserId },
      data: {
        linkedToId: null,
        planId: freePlan?.id || null,
      },
    });
  }

  async getLinkedUsers(companyUserId: string) {
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

    if (!user || user.role !== Role.COMPANY) {
      throw new ForbiddenException(
        'Apenas usuários com plano Escritório podem ver usuários vinculados',
      );
    }

    return user.linkedUsers;
  }

  private async downgradeLinkedUsers(companyUserId: string) {
    const freePlan = await this.prisma.plan.findUnique({
      where: { type: PlanType.FREE },
    });

    await this.prisma.user.updateMany({
      where: { linkedToId: companyUserId },
      data: { planId: freePlan?.id || null },
    });
  }
}
