import { Controller, Post, Body } from '@nestjs/common';
import { PrismaAuthService } from './prisma.auth.service';
import { CreatePrismaDto } from 'src/prisma/dto/create-prisma.dto';
import { LoginUserDto } from './dto/loginUserDto';

@Controller('prismaauth')
export class PrismaAuthController {
  constructor(private readonly authService: PrismaAuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Post('register')
  async register(@Body() createPrismaDto: CreatePrismaDto) {
    return this.authService.register(createPrismaDto);
  }
}
