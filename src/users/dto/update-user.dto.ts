import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Sex } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  oabNumber?: string;

  @IsOptional()
  @IsEnum(Sex)
  sex?: Sex;

  @IsOptional()
  @IsString()
  practiceArea?: string;

  @IsOptional()
  @IsBoolean()
  hasSeenTutorial?: boolean;

  @IsOptional()
  @IsEmail()
  institutionalEmail?: string;

  @IsOptional()
  @MinLength(8)
  password?: string;
}
