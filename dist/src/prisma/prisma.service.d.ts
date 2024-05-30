import { CreatePrismaDto } from './dto/create-prisma.dto';
import { Repository } from 'typeorm';
import { Prisma } from './entities/prisma.entity';
export declare class PrismaService {
    private readonly usersRepositry;
    constructor(usersRepositry: Repository<Prisma>);
    private handleErrors;
    create(payload: CreatePrismaDto): Promise<Prisma>;
    findOneByEmail(email: string): Promise<Prisma | undefined>;
}
