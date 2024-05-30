import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreatePrismaDto } from './dto/create-prisma.dto';
import { Prisma } from './entities/prisma.entity';

@Controller('prisma')
export class PrismaController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post('/signup')
  create(@Body() createPrismaDto: CreatePrismaDto) {
    return this.prismaService.create(createPrismaDto);
  }
  @Get('user')
  async findOneByEmail(
    @Query('email') email: string,
  ): Promise<Prisma | undefined> {
    return this.prismaService.findOneByEmail(email);
  }
}
