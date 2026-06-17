import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  cnpj?: string;

  @IsNotEmpty()
  @IsString()
  facts: string;

  @IsNotEmpty()
  @IsString()
  requests: string;
}
