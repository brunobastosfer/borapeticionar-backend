import { IsEmail, IsOptional, IsUUID } from 'class-validator';

export class SendPetitionMailDto {
  @IsOptional()
  @IsUUID()
  petitionId?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEmail()
  recipientEmail?: string;
}
