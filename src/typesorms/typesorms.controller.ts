import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TypesormsService } from './typesorms.service';
import { CreateTypesormDto } from './dto/create-typesorm.dto';
import { UpdateTypesormDto } from './dto/update-typesorm.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Public } from 'src/common/decoreter/some';
import { SignInDto } from 'src/jwt/dto/signin.dto';

@Controller('typesorms')
export class TypesormsController {
  constructor(private readonly typesormsService: TypesormsService) {}

  @ApiConflictResponse({
    description: 'User already exists',
  })
  @ApiBadRequestResponse({
    description: 'Return errors for invalid sign up fields',
  })
  @ApiCreatedResponse({
    description: 'User has been successfully signed up',
  })
  @Public()
  @Post()
  create(@Body() createTypesormDto: CreateTypesormDto) {
    return this.typesormsService.create(createTypesormDto);
  }

  @ApiBadRequestResponse({
    description: 'Return errors for invalid sign in fields',
  })
  @ApiOkResponse({ description: 'User has been successfully signed in' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.typesormsService.signIn(signInDto);
  }
  @Get()
  findAll() {
    return this.typesormsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesormsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypesormDto: UpdateTypesormDto,
  ) {
    return this.typesormsService.update(id, updateTypesormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesormsService.remove(id);
  }
}
