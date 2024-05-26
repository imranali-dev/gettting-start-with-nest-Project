import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignIN } from 'src/users/dto/signIn-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/users/secama/Model.Users';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  async login(@Body() signInDto: SignIN) {
    const user = await this.authService.validateUser(
      signInDto.email,
      signInDto.password,
    );
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Post('verify')
  async verifyUser(@Body() verifyUserDto: CreateAuthDto): Promise<Users> {
    return this.authService.verifyUser(verifyUserDto);
  }
}
