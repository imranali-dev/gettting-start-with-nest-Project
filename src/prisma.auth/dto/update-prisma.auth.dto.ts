import { PartialType } from '@nestjs/swagger';
import { CreatePrismaAuthDto } from './create-prisma.auth.dto';

export class UpdatePrismaAuthDto extends PartialType(CreatePrismaAuthDto) {}
