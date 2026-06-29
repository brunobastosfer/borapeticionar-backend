import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  institutionalEmail: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  captchaToken: string;
}
