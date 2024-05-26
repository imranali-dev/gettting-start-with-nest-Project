import { Module } from '@nestjs/common';
import { CrudTypeormsService } from './crud.typeorms.service';
import { CrudTypeormsController } from './crud.typeorms.controller';

@Module({
  controllers: [CrudTypeormsController],
  providers: [CrudTypeormsService],
})
export class CrudTypeormsModule {}
