import { IsOptional, IsString, IsEnum, IsBoolean } from 'class-validator';
import { PetitionStatus } from '@prisma/client';
import { IsValidCnpj, IsValidCpfCnpj } from '../../common/validators';

export class UpdatePetitionDto {
  @IsOptional()
  @IsString()
  practiceArea?: string;

  @IsOptional()
  @IsString()
  font?: string;

  @IsOptional()
  @IsString()
  documentFont?: string;

  @IsOptional()
  @IsString()
  textColor?: string;

  @IsOptional()
  @IsString()
  documentColor?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  @IsValidCpfCnpj()
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
  companyAddress?: string;

  @IsOptional()
  @IsString()
  @IsValidCnpj()
  cnpj?: string;

  @IsOptional()
  @IsString()
  courtDivision?: string;

  @IsOptional()
  @IsString()
  dismissalType?: string;

  @IsOptional()
  @IsString()
  controversialPoints?: string;

  @IsOptional()
  @IsString()
  caseValue?: string;

  @IsOptional()
  @IsBoolean()
  requestFgtsWithdrawal?: boolean;

  @IsOptional()
  @IsBoolean()
  requestFgtsFine?: boolean;

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
