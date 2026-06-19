import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Sex } from '@prisma/client';
import { IsValidCpf } from '../../common/validators';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsValidCpf()
  cpf: string;

  @IsOptional()
  @IsString()
  oabNumber?: string;

  @IsOptional()
  @IsEnum(Sex)
  sex?: Sex;

  @IsOptional()
  @IsString()
  practiceArea?: string;

  @IsNotEmpty()
  @IsEmail()
  institutionalEmail: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
