import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CrudTypeormsService } from './crud.typeorms.service';
import { CreateCrudTypeormDto } from './dto/create-crud.typeorm.dto';
import { UpdateCrudTypeormDto } from './dto/update-crud.typeorm.dto';

@Controller('crud.typeorms')
export class CrudTypeormsController {
  constructor(private readonly crudTypeormsService: CrudTypeormsService) {}

  @Post()
  create(@Body() createCrudTypeormDto: CreateCrudTypeormDto) {
    return this.crudTypeormsService.create(createCrudTypeormDto);
  }

  @Get()
  findAll() {
    return this.crudTypeormsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudTypeormsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrudTypeormDto: UpdateCrudTypeormDto) {
    return this.crudTypeormsService.update(+id, updateCrudTypeormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudTypeormsService.remove(+id);
  }
}
