import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Typesorm } from 'src/typesorms/entities/typesorm.entity';
import { SignUpDto } from './dto/signup.dto';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signin.dto';
import { BcryptService } from './bycrpt.service';
import { randomUUID } from 'crypto';
import { ActiveUserData } from 'interfaces/active-user-data.interface';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/common/jwt.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServices {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @InjectRepository(Typesorm)
    private readonly userRepository: Repository<Typesorm>,
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
  async create(payload: SignUpDto): Promise<Typesorm> {
    try {
      const user: Typesorm = new Typesorm();
      user.email = payload.email;
      user.password = payload.password;
      return await this.userRepository.save(user);
    } catch (error) {
      await this.handleErrors(error);
    }
  }
  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOne({
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
  findAll() {
    return `This action returns all jwt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jwt`;
  }

  update(id: number) {
    return `This action updates a #${id} jwt`;
  }

  remove(id: number) {
    return `This action removes a #${id} jwt`;
  }
}
