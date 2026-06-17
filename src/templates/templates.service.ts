import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTemplateDto) {
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

  async findByPlan(planId: string) {
    return this.prisma.petitionTemplate.findMany({
      where: {
        OR: [{ isPublic: true }, { planId }],
      },
      orderBy: { category: 'asc' },
    });
  }

  async findOne(id: string) {
    const template = await this.prisma.petitionTemplate.findUnique({
      where: { id },
    });
    if (!template) {
      throw new NotFoundException('Template não encontrado');
    }
    return template;
  }

  async update(id: string, dto: UpdateTemplateDto) {
    await this.findOne(id);
    return this.prisma.petitionTemplate.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.petitionTemplate.delete({ where: { id } });
  }

  async getAvailableForUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { plan: true },
    });

    if (!user || !user.plan) {
      throw new ForbiddenException('Usuário sem plano ativo');
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
}
