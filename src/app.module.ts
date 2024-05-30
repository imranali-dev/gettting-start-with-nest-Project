import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaAuthModule } from './prisma.auth/prisma.auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'guards/jwt.gards';
import { JwtModule } from '@nestjs/jwt';
import { PrismaAuthService } from './prisma.auth/prisma.auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '60m' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'testusername',
      password: 'admin123',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/tst'),
    UsersModule,
    AuthModule,
    // SimplesuthModule,
    PrismaModule,
    PrismaAuthModule,
    // TypesormsModule,
    // JwtModules,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PrismaAuthService,
  ],
})
export class AppModule {
  constructor() {
    console.log('AppModule initialized');
  }
}
