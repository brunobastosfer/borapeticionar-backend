import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  IsEnum,
} from 'class-validator';
import { PlanType } from '../../../generated/prisma/client.js';

export class CreatePlanDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(PlanType)
  type: PlanType;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  monthlyLimit?: number | null;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  canExportPdf?: boolean;

  @IsOptional()
  @IsBoolean()
  canExportWord?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  practiceAreas?: string[];

  @IsOptional()
  @IsBoolean()
  hasDashboard?: boolean;

  @IsOptional()
  @IsBoolean()
  hasFullHistory?: boolean;

  @IsOptional()
  @IsBoolean()
  hasExpandedLibrary?: boolean;

  @IsOptional()
  @IsBoolean()
  isMultiUser?: boolean;

  @IsOptional()
  @IsBoolean()
  hasTeamManagement?: boolean;

  @IsOptional()
  @IsBoolean()
  hasPriority?: boolean;

  @IsOptional()
  @IsBoolean()
  hasCustomTemplates?: boolean;

  @IsOptional()
  @IsBoolean()
  hasRealTimePreview?: boolean;

  @IsOptional()
  @IsBoolean()
  hasBasicEditor?: boolean;

  @IsOptional()
  @IsBoolean()
  hasBasicExport?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];
}
