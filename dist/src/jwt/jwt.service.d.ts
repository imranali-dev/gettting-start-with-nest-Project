import { Typesorm } from 'src/typesorms/entities/typesorm.entity';
import { SignUpDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signin.dto';
import { BcryptService } from './bycrpt.service';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/common/jwt.config';
import { JwtService } from '@nestjs/jwt';
export declare class JwtServices {
    private readonly jwtConfiguration;
    private readonly bcryptService;
    private readonly jwtService;
    private readonly userRepository;
    constructor(jwtConfiguration: ConfigType<typeof jwtConfig>, bcryptService: BcryptService, jwtService: JwtService, userRepository: Repository<Typesorm>);
    private handleErrors;
    generateAccessToken(user: Partial<Typesorm>): Promise<{
        accessToken: string;
    }>;
    create(payload: SignUpDto): Promise<Typesorm>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number): string;
    remove(id: number): string;
}
