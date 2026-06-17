import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateTemplateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  planId?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
