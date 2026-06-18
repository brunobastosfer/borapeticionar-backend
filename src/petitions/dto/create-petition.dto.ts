import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsValidCnpj, IsValidCpfCnpj } from '../../common/validators';

export class CreatePetitionDto {
  @IsOptional()
  @IsString()
  practiceArea?: string;

  @IsOptional()
  @IsString()
  font?: string;

  @IsOptional()
  @IsString()
  textColor?: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsValidCpfCnpj()
  cpfCnpj: string;

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

  @IsNotEmpty()
  @IsString()
  defendantCompany: string;

  @IsOptional()
  @IsString()
  @IsValidCnpj()
  cnpj?: string;

  @IsNotEmpty()
  @IsString()
  facts: string;

  @IsNotEmpty()
  @IsString()
  requests: string;
}
