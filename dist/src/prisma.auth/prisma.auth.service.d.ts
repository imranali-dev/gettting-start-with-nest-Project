import { JwtService } from '@nestjs/jwt';
import { CreatePrismaDto } from 'src/prisma/dto/create-prisma.dto';
import { LoginUserDto } from './dto/loginUserDto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PrismaAuthService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    register(createPrismaDto: CreatePrismaDto): Promise<{
        access_token: string;
    }>;
}
