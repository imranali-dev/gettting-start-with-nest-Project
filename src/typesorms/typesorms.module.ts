import { Module } from '@nestjs/common';
import { TypesormsService } from './typesorms.service';
import { TypesormsController } from './typesorms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Typesorm } from './entities/typesorm.entity';
// import jwtConfig from 'src/common/jwt.config';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TypesormsController],
  providers: [TypesormsService],
  imports: [
    // JwtModule.registerAsync(jwtConfig.asProvider()),
    TypeOrmModule.forFeature([Typesorm]),
  ],
  exports: [Typesorm],
})
export class TypesormsModule {}
