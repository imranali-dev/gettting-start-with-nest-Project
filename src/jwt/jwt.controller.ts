import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtServices } from './jwt.service';
// import { UpdateJwtDto } from './dto/update-jwt.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('jwt')
export class JwtController {
  constructor(private readonly jwtService: JwtServices) {}

  @Post()
  create(@Body() createJwtDto: SignUpDto) {
    return this.jwtService.create(createJwtDto);
  }

  @Get()
  findAll() {
    return this.jwtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jwtService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJwtDto: UpdateJwtDto) {
  //   return this.jwtService.update(id, updateJwtDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jwtService.remove(+id);
  }
}
