import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { institutionalEmail: dto.institutionalEmail },
    });
    if (existingEmail) {
      throw new ConflictException('Email institucional já cadastrado');
    }

    const existingCpf = await this.prisma.user.findUnique({
      where: { cpf: dto.cpf },
    });
    if (existingCpf) {
      throw new ConflictException('CPF já cadastrado');
    }

    const freePlan = await this.prisma.plan.findUnique({
      where: { type: 'FREE' },
    });

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        planId: freePlan?.id ?? null,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        cpf: true,
        oabNumber: true,
        uf: true,
        sex: true,
        practiceArea: true,
        hasSeenTutorial: true,
        institutionalEmail: true,
        planId: true,
        createdAt: true,
      },
    });

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        cpf: true,
        oabNumber: true,
        sex: true,
        practiceArea: true,
        hasSeenTutorial: true,
        institutionalEmail: true,
        planId: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { plan: true },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { institutionalEmail: email },
      include: { plan: true },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 12);
    }

    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        cpf: true,
        oabNumber: true,
        sex: true,
        practiceArea: true,
        hasSeenTutorial: true,
        institutionalEmail: true,
        planId: true,
        createdAt: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
