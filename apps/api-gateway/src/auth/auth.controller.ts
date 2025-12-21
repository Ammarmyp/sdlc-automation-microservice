import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AUTH_PATTERNS, MICRO_SERVICE_CLIENTS } from '../utils/constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RegisterDto } from './dto/register.dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject(MICRO_SERVICE_CLIENTS.USER_SERVICE)
    private readonly authclient: ClientProxy,
  ) {}
  @Post('login')
  async login(@Body() body: LoginDto) {
    console.log('☑️request from api gateway:', JSON.stringify(body));

    const response = await firstValueFrom(
      this.authclient.send(AUTH_PATTERNS.LOGIN, body),
    );
    console.log('☑️response from user service:', response);
    return response;
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    console.log('☑️request from api gateway:', JSON.stringify(body));

    return await firstValueFrom(
      this.authclient.send(AUTH_PATTERNS.REGISTER, body),
    );
  }
}
