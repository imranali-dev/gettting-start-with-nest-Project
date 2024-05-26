import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
export declare class AuthToken {
    private readonly jwtservice;
    constructor(jwtservice: JwtService);
    generateToken(payload: CreateUserDto): string;
}
