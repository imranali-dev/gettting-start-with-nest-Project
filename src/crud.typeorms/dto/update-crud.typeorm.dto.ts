import { PartialType } from '@nestjs/mapped-types';
import { CreateCrudTypeormDto } from './create-crud.typeorm.dto';

export class UpdateCrudTypeormDto extends PartialType(CreateCrudTypeormDto) {}
