import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { Roles } from 'src/decorators/role/role.decorator';
import { Role } from 'src/guards/role/role.guard';

@Controller('managers')
export class ManagerController {
  constructor(private managerService: ManagerService) { }

  @Roles(["Manager"])
  @Post('send')
  sendAction(@Request() req) {
    const { user } = req
    return this.managerService.sendAction(Number(user.sub));
  }
}
