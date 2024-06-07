import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { LogIntercepador } from 'src/intercptadors/log-interceptador';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(LogIntercepador)
  @Post('register')
  async register(@Body()data: AuthRegisterDto){
    return this.authService.register(data)
  };


  @Post('login')
  async login(@Body(){email, password}: AuthLoginDto){
    return this.authService.login(email, password)
  };

}
