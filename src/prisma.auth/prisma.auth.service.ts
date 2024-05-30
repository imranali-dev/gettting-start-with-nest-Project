import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import { JwtPayload } from './dto/types/jwt.payload';
// import { Tokens } from './dto/types/token.types';
import { CreatePrismaDto } from 'src/prisma/dto/create-prisma.dto';
import { LoginUserDto } from './dto/loginUserDto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class PrismaAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prismaService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.hash))) {
      const { hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(createPrismaDto: CreatePrismaDto) {
    const user = await this.prismaService.create(createPrismaDto);
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
