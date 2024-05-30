import { PartialType } from '@nestjs/swagger';
import { CreateTypesormDto } from './create-typesorm.dto';

export class UpdateTypesormDto extends PartialType(CreateTypesormDto) {}
