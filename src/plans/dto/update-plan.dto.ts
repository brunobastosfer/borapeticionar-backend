import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  name?: string;

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
