import {
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 6 characters long' })
  @MaxLength(37, { message: 'Username must be less then 37 characters long' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please use a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsNumber()
  verifyCode?: number;

  @IsOptional()
  verifyCodeExpiry?: Date;
}

export class CreatSignIN {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;
}
export class VerifyUsers {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  verifyCode: string;
}
