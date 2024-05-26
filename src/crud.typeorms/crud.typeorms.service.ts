import { Injectable } from '@nestjs/common';
import { CreateCrudTypeormDto } from './dto/create-crud.typeorm.dto';
import { UpdateCrudTypeormDto } from './dto/update-crud.typeorm.dto';

@Injectable()
export class CrudTypeormsService {
  create(createCrudTypeormDto: CreateCrudTypeormDto) {
    return 'This action adds a new crudTypeorm';
  }

  findAll() {
    return `This action returns all crudTypeorms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crudTypeorm`;
  }

  update(id: number, updateCrudTypeormDto: UpdateCrudTypeormDto) {
    return `This action updates a #${id} crudTypeorm`;
  }

  remove(id: number) {
    return `This action removes a #${id} crudTypeorm`;
  }
}
