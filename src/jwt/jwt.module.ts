import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { JwtServices } from './jwt.service';
import { JwtController } from './jwt.controller';
import { Typesorm } from 'src/typesorms/entities/typesorm.entity';
import jwtConfig from 'src/common/jwt.config';
import { BcryptService } from './bycrpt.service';
import { TypesormsModule } from 'src/typesorms/typesorms.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Typesorm]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TypesormsModule,
  ],
  controllers: [JwtController],
  providers: [JwtServices, BcryptService],
  exports: [JwtServices, BcryptService, JwtModule],
})
export class JwtModules {}
