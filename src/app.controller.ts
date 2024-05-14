import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public/public.decorator';

@Controller("home")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Public()
  async getHello(): Promise<string> {
    return "check your email"
  }
}
