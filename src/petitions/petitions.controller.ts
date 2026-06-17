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
  ForbiddenException,
} from '@nestjs/common';
import { PetitionsService } from './petitions.service';
import { CreatePetitionDto } from './dto/create-petition.dto';
import { UpdatePetitionDto } from './dto/update-petition.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('petitions')
@UseGuards(JwtAuthGuard)
export class PetitionsController {
  constructor(private readonly petitionsService: PetitionsService) {}

  @Post()
  create(
    @Request() req: { user: { id: string } },
    @Body() dto: CreatePetitionDto,
  ) {
    return this.petitionsService.create(req.user.id, dto);
  }

  @Post('draft')
  saveDraft(
    @Request() req: { user: { id: string } },
    @Body() dto: CreatePetitionDto,
  ) {
    return this.petitionsService.saveDraft(req.user.id, dto);
  }

  @Post(':id/activate')
  activateDraft(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.petitionsService.activateDraft(id, req.user.id);
  }

  @Get()
  findAll(@Request() req: { user: { id: string } }) {
    return this.petitionsService.findAllByUser(req.user.id);
  }

  @Get('active')
  findActive(@Request() req: { user: { id: string } }) {
    return this.petitionsService.findActive(req.user.id);
  }

  @Get('archived')
  findArchived(@Request() req: { user: { id: string } }) {
    return this.petitionsService.findArchived(req.user.id);
  }

  @Get('drafts')
  findDrafts(@Request() req: { user: { id: string } }) {
    return this.petitionsService.findDrafts(req.user.id);
  }

  @Get('favorites')
  getFavorites(@Request() req: { user: { id: string } }) {
    return this.petitionsService.getFavorites(req.user.id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.petitionsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
    @Body() dto: UpdatePetitionDto,
  ) {
    return this.petitionsService.update(id, req.user.id, dto);
  }

  @Post(':id/archive')
  archive(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.petitionsService.archive(id, req.user.id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.petitionsService.remove(id, req.user.id);
  }

  @Post(':id/favorite')
  addFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.petitionsService.addFavorite(req.user.id, id);
  }

  @Delete(':id/favorite')
  removeFavorite(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.petitionsService.removeFavorite(req.user.id, id);
  }

  @Get(':id/can-export')
  async canExport(
    @Param('id', ParseUUIDPipe) _id: string,
    @Request() req: { user: { id: string } },
  ) {
    const canExport = await this.petitionsService.canExportPdf(req.user.id);
    if (!canExport) {
      throw new ForbiddenException(
        'Seu plano não permite exportação de PDF. Faça upgrade.',
      );
    }
    return { canExport: true };
  }

  @Get(':id/can-export-word')
  async canExportWord(
    @Param('id', ParseUUIDPipe) _id: string,
    @Request() req: { user: { id: string } },
  ) {
    const canExport = await this.petitionsService.canExportWord(req.user.id);
    if (!canExport) {
      throw new ForbiddenException(
        'Seu plano não permite exportação de Word. Faça upgrade.',
      );
    }
    return { canExport: true };
  }

  @Get('permissions/me')
  getPermissions(@Request() req: { user: { id: string } }) {
    return this.petitionsService.getUserPermissions(req.user.id);
  }
}
