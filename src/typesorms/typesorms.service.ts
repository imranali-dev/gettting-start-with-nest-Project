import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTypesormDto } from './dto/create-typesorm.dto';
import { UpdateTypesormDto } from './dto/update-typesorm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Typesorm } from './entities/typesorm.entity';
import { SignInDto } from 'src/jwt/dto/signin.dto';
import { BcryptService } from 'src/jwt/bycrpt.service';
import { randomUUID } from 'crypto';
import { ActiveUserData } from 'interfaces/active-user-data.interface';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/common/jwt.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TypesormsService {
  constructor(
    @InjectRepository(Typesorm)
    private readonly userRepositry: Repository<Typesorm>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  private async handleErrors(error: any): Promise<void> {
    if (error.code === 11000) {
      throw new BadRequestException('User with this email already exists');
    }
    if (error.errors) {
      const messages = Object.values(error.errors).map(
        (err: any) => err.message,
      );
      throw new BadRequestException(messages);
    }
    throw new InternalServerErrorException(
      'An error occurred while processing the request',
    );
  }
  async generateAccessToken(
    user: Partial<Typesorm>,
  ): Promise<{ accessToken: string }> {
    const tokenId = randomUUID();

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        email: user.email,
        tokenId,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return { accessToken };
  }
  async create(payload: CreateTypesormDto): Promise<Typesorm> {
    try {
      const user: Typesorm = new Typesorm();
      user.email = payload.email;
      user.password = payload.password;
      return await this.userRepositry.save(user);
    } catch (error) {
      await this.handleErrors(error);
    }
  }
  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;

    const user = await this.userRepositry.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }

    return await this.generateAccessToken(user);
  }

  async findAll(): Promise<Typesorm[]> {
    return await this.userRepositry.find();
  }

  async findOne(userid: string): Promise<Typesorm> {
    const user = await this.userRepositry.findOne({
      where: {
        id: userid,
      },
    });
    return user;
  }

  async update(userid: string, payload: UpdateTypesormDto): Promise<Typesorm> {
    const user: Typesorm = new Typesorm();
    user.email = payload.email;
    user.password = payload.password;
    return await this.userRepositry.save(user);
  }

  async remove(id: string) {
    const users = await this.userRepositry.delete(id);
    return `${users} is delted`;
  }
}
