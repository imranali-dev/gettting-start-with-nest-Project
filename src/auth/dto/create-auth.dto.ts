import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  verifyCode: number;
}
