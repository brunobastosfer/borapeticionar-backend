import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreatePlanDto) {
    return this.plansService.create(dto);
  }

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Get('available')
  findAvailable() {
    return this.plansService.findAvailable();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.plansService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdatePlanDto) {
    return this.plansService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.plansService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/subscribe')
  subscribe(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.plansService.subscribe(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('usage/me')
  getUsage(@Request() req: { user: { id: string } }) {
    return this.plansService.getUsage(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY)
  @Post('link-user')
  linkUser(
    @Request() req: { user: { id: string } },
    @Body('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.plansService.linkUser(req.user.id, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY)
  @Post('unlink-user')
  unlinkUser(
    @Request() req: { user: { id: string } },
    @Body('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.plansService.unlinkUser(req.user.id, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY)
  @Get('linked-users')
  getLinkedUsers(@Request() req: { user: { id: string } }) {
    return this.plansService.getLinkedUsers(req.user.id);
  }
}
