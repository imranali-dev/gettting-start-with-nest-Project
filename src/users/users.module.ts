import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersModel } from './secama/Model.Users';
// import { JwtModule } from '@nestjs/jwt';
import { AuthToken } from './auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersModel,
      },
    ]),
    // JwtModule.register({
    //   secret: 'hdshfdksjfxc=-csvrieug',
    //   signOptions: {
    //     expiresIn: '500s',
    //   },
    // }),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthToken],
  exports: [UsersService],
})
export class UsersModule {}
