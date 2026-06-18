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
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { AddMemberDto } from './dto/add-member.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CnpjMaskPipe } from '../common/pipes';

@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  create(
    @Request() req: { user: { id: string } },
    @Body(CnpjMaskPipe) dto: CreateOrganizationDto,
  ) {
    return this.organizationsService.create(req.user.id, dto);
  }

  @Get('owned')
  findByOwner(@Request() req: { user: { id: string } }) {
    return this.organizationsService.findByOwner(req.user.id);
  }

  @Get('memberships')
  findUserOrganizations(@Request() req: { user: { id: string } }) {
    return this.organizationsService.findUserOrganizations(req.user.id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.organizationsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
    @Body(CnpjMaskPipe) dto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.organizationsService.remove(id, req.user.id);
  }

  @Post(':id/members')
  addMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
    @Body() dto: AddMemberDto,
  ) {
    return this.organizationsService.addMember(
      id,
      req.user.id,
      dto.userId,
      dto.role,
    );
  }

  @Delete(':id/members/:memberId')
  removeMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('memberId', ParseUUIDPipe) memberId: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.organizationsService.removeMember(id, req.user.id, memberId);
  }

  @Get(':id/members')
  getMembers(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.organizationsService.getMembers(id, req.user.id);
  }
}
