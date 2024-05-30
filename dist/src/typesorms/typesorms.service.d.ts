import { CreateTypesormDto } from './dto/create-typesorm.dto';
import { UpdateTypesormDto } from './dto/update-typesorm.dto';
import { Repository } from 'typeorm';
import { Typesorm } from './entities/typesorm.entity';
import { SignInDto } from 'src/jwt/dto/signin.dto';
import { BcryptService } from 'src/jwt/bycrpt.service';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/common/jwt.config';
import { JwtService } from '@nestjs/jwt';
export declare class TypesormsService {
    private readonly userRepositry;
    private readonly bcryptService;
    private readonly jwtService;
    private readonly jwtConfiguration;
    constructor(userRepositry: Repository<Typesorm>, bcryptService: BcryptService, jwtService: JwtService, jwtConfiguration: ConfigType<typeof jwtConfig>);
    private handleErrors;
    generateAccessToken(user: Partial<Typesorm>): Promise<{
        accessToken: string;
    }>;
    create(payload: CreateTypesormDto): Promise<Typesorm>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    findAll(): Promise<Typesorm[]>;
    findOne(userid: string): Promise<Typesorm>;
    update(userid: string, payload: UpdateTypesormDto): Promise<Typesorm>;
    remove(id: string): Promise<string>;
}
