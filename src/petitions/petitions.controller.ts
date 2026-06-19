import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Request,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CpfCnpjMaskPipe } from '../common/pipes';
import { CreatePetitionDto } from './dto/create-petition.dto';
import { ListPetitionsQueryDto } from './dto/list-petitions-query.dto';
import { SendPetitionMailDto } from './dto/send-petition-mail.dto';
import { UpdatePetitionDto } from './dto/update-petition.dto';
import { PetitionsService } from './petitions.service';

@Controller('petitions')
@UseGuards(JwtAuthGuard)
export class PetitionsController {
  constructor(private readonly petitionsService: PetitionsService) {}

  @Post()
  create(
    @Request() req: { user: { id: string } },
    @Body(CpfCnpjMaskPipe) dto: CreatePetitionDto,
  ) {
    return this.petitionsService.create(req.user.id, dto);
  }

  @Post('draft')
  saveDraft(
    @Request() req: { user: { id: string } },
    @Body(CpfCnpjMaskPipe) dto: CreatePetitionDto,
  ) {
    return this.petitionsService.saveDraft(req.user.id, dto);
  }

  @Post('enviar-peticao/mail')
  sendPetitionMailByBody(
    @Request() req: { user: { id: string } },
    @Body() dto: SendPetitionMailDto,
  ) {
    if (!dto.petitionId) {
      throw new BadRequestException('Informe o id da peticao');
    }

    return this.petitionsService.sendPetitionMail(
      req.user.id,
      dto.petitionId,
      this.resolveRecipientEmail(dto),
    );
  }

  @Post(':id/activate')
  activateDraft(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.petitionsService.activateDraft(id, req.user.id);
  }

  @Get()
  findAll(
    @Request() req: { user: { id: string } },
    @Query() query: ListPetitionsQueryDto = {},
  ) {
    return this.petitionsService.findAllByUser(req.user.id, query);
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

  @Get('permissions/me')
  getPermissions(@Request() req: { user: { id: string } }) {
    return this.petitionsService.getUserPermissions(req.user.id);
  }

  @Get('dashboard/me')
  getDashboardSummary(@Request() req: { user: { id: string } }) {
    return this.petitionsService.getDashboardSummary(req.user.id);
  }

  @Get(':id/download-pdf')
  async downloadPdf(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.petitionsService.downloadPdf(req.user.id, id);

    response.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${file.filename}"`,
      'Content-Length': file.buffer.length.toString(),
    });

    return new StreamableFile(file.buffer);
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
    @Body(CpfCnpjMaskPipe) dto: UpdatePetitionDto,
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

  @Post(':id/enviar-peticao/mail')
  sendPetitionMail(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { id: string } },
    @Body() dto: SendPetitionMailDto,
  ) {
    return this.petitionsService.sendPetitionMail(
      req.user.id,
      id,
      this.resolveRecipientEmail(dto),
    );
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
        'Seu plano nao permite exportacao de PDF. Faca upgrade.',
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
        'Seu plano nao permite exportacao de Word. Faca upgrade.',
      );
    }
    return { canExport: true };
  }

  private resolveRecipientEmail(dto: SendPetitionMailDto) {
    return dto.recipientEmail ?? dto.email;
  }
}
