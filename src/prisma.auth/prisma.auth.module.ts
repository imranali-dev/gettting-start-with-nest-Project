import { Module } from '@nestjs/common';
import { PrismaAuthService } from './prisma.auth.service';
import { PrismaAuthController } from './prisma.auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/utils/jwt.constants';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './dto/statragies/Jwt.stratgies';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [PrismaAuthController],
  providers: [PrismaAuthService, JwtStrategy],
})
export class PrismaAuthModule {}
