import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { LogIntercepador } from 'src/intercptadors/log-interceptador';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(LogIntercepador)
  @Post('register')
  async register(@Body()data: AuthRegisterDto){
    return this.authService.register(data)
  };

}
