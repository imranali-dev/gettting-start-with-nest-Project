import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignIN } from './dto/signIn-user.dto';
import { Users } from './secama/Model.Users';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signupauth')
  AUth(@Body() payload: CreateUserDto) {
    return this.usersService.AuthUsers(payload);
  }
  @Post('signin/b')
  signinauth(@Body() payload: SignIN) {
    return this.usersService.signINuser(payload);
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
  @Post('/signin/a')
  SignIn(@Body() SignintoDTO: SignIN): Promise<Users> {
    return this.usersService.SigIn(SignintoDTO);
  }
}
