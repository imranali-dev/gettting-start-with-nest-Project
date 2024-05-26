import {
  Injectable,
  Inject,
  forwardRef,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { Users } from 'src/users/secama/Model.Users';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Users> {
    const user = await this.usersService.findOne(email);
    if (user && (await comparePassword(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: Users) {
    const payload = { username: user.username, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<Users> {
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return user;
  }
  async verifyUser(verifyUserDto: CreateAuthDto): Promise<Users> {
    const { email, verifyCode } = verifyUserDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.verifyCode !== verifyCode) {
      throw new BadRequestException('Invalid verification code');
    }
    if (user.verifyCodeExpiry < new Date()) {
      throw new BadRequestException('Verification code expired');
    }
    user.isVerified = true;
    return user;
  }
  // async verifyUser(verifyUserDto: CreateAuthDto): Promise<Users> {
  //   const { email, verifyCode } = verifyUserDto;
  //   const user = await this.usersService.findOne(email);
  //   if (!user) {
  //     throw new BadRequestException('User not found');
  //   }
  //   if (user.verifyCode !== verifyCode) {
  //     throw new BadRequestException('Invalid verification code');
  //   }
  //   if (user.verifyCodeExpiry < new Date()) {
  //     throw new BadRequestException('Verification code expired');
  //   }
  //   user.isVerified = true;
  //   await user.save();
  //   return user;
  // }
}
