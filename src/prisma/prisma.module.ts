import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaController } from './prisma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prisma } from './entities/prisma.entity';

@Module({
  controllers: [PrismaController],
  providers: [PrismaService],
  imports: [TypeOrmModule.forFeature([Prisma])],
  exports: [PrismaService],
})
export class PrismaModule {}
