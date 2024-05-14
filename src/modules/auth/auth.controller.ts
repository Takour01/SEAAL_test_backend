import { Controller, Post, Body, HttpException, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SinginAuthDto } from './dto/signin-auth.dto';
import { Public } from 'src/decorators/public/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  async login(@Body() dto: SinginAuthDto) {
    const result = await this.authService.login(dto);
    if (typeof result === 'string') {
      throw new HttpException(result, HttpStatus.UNAUTHORIZED);
    }
    return result;
  }
  @Public()
  @Post('register')
  async register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
