import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthToken {
  constructor(private readonly jwtservice: JwtService) {}
  generateToken(payload: CreateUserDto): string {
    return this.jwtservice.sign(payload);
  }
}
