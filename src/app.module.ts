import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log('hello yaar');
  }
}
