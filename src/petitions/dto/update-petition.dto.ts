import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PetitionStatus } from '@prisma/client';

export class UpdatePetitionDto {
  @IsOptional()
  @IsString()
  practiceArea?: string;

  @IsOptional()
  @IsString()
  font?: string;

  @IsOptional()
  @IsString()
  textColor?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  cpfCnpj?: string;

  @IsOptional()
  @IsString()
  rg?: string;

  @IsOptional()
  @IsString()
  maritalStatus?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  defendantCompany?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  facts?: string;

  @IsOptional()
  @IsString()
  requests?: string;

  @IsOptional()
  @IsEnum(PetitionStatus)
  status?: PetitionStatus;
}
