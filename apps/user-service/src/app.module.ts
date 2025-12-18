import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from 'src/lib/auth';
import { UsersController } from './users/users.controller';

@Module({
  imports: [AuthModule.forRoot({ auth })],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
