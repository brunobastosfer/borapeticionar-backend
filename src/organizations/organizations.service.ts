import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrganizationDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { plan: true },
    });

    if (!user || !user.plan) {
      throw new ForbiddenException('Usuário sem plano ativo');
    }

    if (!user.plan.isMultiUser) {
      throw new ForbiddenException(
        'Seu plano não permite criação de organizações. Faça upgrade para o plano Escritório.',
      );
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

  async findByOwner(userId: string) {
    return this.prisma.organization.findMany({
      where: { ownerId: userId },
      include: { members: { include: { user: true } }, plan: true },
    });
  }

  async findUserOrganizations(userId: string) {
    return this.prisma.organizationMember.findMany({
      where: { userId },
      include: { organization: { include: { plan: true } } },
    });
  }

  async findOne(id: string, userId: string) {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
      include: { members: true, plan: true },
    });

    if (!organization) {
      throw new NotFoundException('Organização não encontrada');
    }

    const isMember = organization.members.some((m) => m.userId === userId);
    if (!isMember) {
      throw new ForbiddenException('Você não é membro desta organização');
    }

    return organization;
  }

  async update(id: string, userId: string, dto: UpdateOrganizationDto) {
    const organization = await this.findOne(id, userId);

    if (organization.ownerId !== userId) {
      throw new ForbiddenException(
        'Apenas o proprietário pode editar a organização',
      );
    }

    return this.prisma.organization.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, userId: string) {
    const organization = await this.findOne(id, userId);

    if (organization.ownerId !== userId) {
      throw new ForbiddenException(
        'Apenas o proprietário pode excluir a organização',
      );
    }

    return this.prisma.organization.delete({ where: { id } });
  }

  async addMember(
    organizationId: string,
    userId: string,
    memberUserId: string,
    role: string = 'member',
  ) {
    const organization = await this.findOne(organizationId, userId);

    const member = organization.members.find((m) => m.userId === userId);
    if (!member || !['owner', 'admin'].includes(member.role)) {
      throw new ForbiddenException(
        'Apenas proprietários ou administradores podem adicionar membros',
      );
    }

    const existingMember = organization.members.find(
      (m) => m.userId === memberUserId,
    );
    if (existingMember) {
      throw new ConflictException('Usuário já é membro desta organização');
    }

    return this.prisma.organizationMember.create({
      data: {
        organizationId,
        userId: memberUserId,
        role,
      },
    });
  }

  async removeMember(
    organizationId: string,
    userId: string,
    memberUserId: string,
  ) {
    const organization = await this.findOne(organizationId, userId);

    const member = organization.members.find((m) => m.userId === userId);
    if (!member || !['owner', 'admin'].includes(member.role)) {
      throw new ForbiddenException(
        'Apenas proprietários ou administradores podem remover membros',
      );
    }

    const targetMember = organization.members.find(
      (m) => m.userId === memberUserId,
    );
    if (!targetMember) {
      throw new NotFoundException('Membro não encontrado');
    }

    if (targetMember.role === 'owner') {
      throw new ForbiddenException('Não é possível remover o proprietário');
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

  async getMembers(organizationId: string, userId: string) {
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
}
