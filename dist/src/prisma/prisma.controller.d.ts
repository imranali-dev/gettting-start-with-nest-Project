import { PrismaService } from './prisma.service';
import { CreatePrismaDto } from './dto/create-prisma.dto';
import { Prisma } from './entities/prisma.entity';
export declare class PrismaController {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createPrismaDto: CreatePrismaDto): Promise<Prisma>;
    findOneByEmail(email: string): Promise<Prisma | undefined>;
}
