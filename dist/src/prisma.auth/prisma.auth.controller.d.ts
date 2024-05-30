import { PrismaAuthService } from './prisma.auth.service';
import { CreatePrismaDto } from 'src/prisma/dto/create-prisma.dto';
import { LoginUserDto } from './dto/loginUserDto';
export declare class PrismaAuthController {
    private readonly authService;
    constructor(authService: PrismaAuthService);
    login(loginUserDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    register(createPrismaDto: CreatePrismaDto): Promise<{
        access_token: string;
    }>;
}
