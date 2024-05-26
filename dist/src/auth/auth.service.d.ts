import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Users } from 'src/users/secama/Model.Users';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<Users>;
    login(user: Users): Promise<{
        access_token: string;
    }>;
    signUp(createUserDto: CreateUserDto): Promise<Users>;
    verifyUser(verifyUserDto: CreateAuthDto): Promise<Users>;
}
