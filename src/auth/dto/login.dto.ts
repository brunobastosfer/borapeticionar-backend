import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  institutionalEmail: string;

  @IsNotEmpty()
  password: string;
}
