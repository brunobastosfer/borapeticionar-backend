import { IsOptional, IsString } from 'class-validator';
import { IsValidCnpj } from '../../common/validators';

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsValidCnpj()
  cnpj?: string;

  @IsOptional()
  @IsString()
  planId?: string;
}
