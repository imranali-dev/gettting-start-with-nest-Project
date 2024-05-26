import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignIN {
  @IsEmail({}, { message: 'Please use a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;
}
