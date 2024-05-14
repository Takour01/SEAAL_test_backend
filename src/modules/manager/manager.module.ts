import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { DatabaseModule } from '../database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/role/role.guard';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }, {
      provide: APP_GUARD,
      useClass: RolesGuard
    }],
  imports: [DatabaseModule],
  exports: [ManagerService]
})
export class ManagerModule { }
