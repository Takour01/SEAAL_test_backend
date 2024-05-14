import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/role/role.guard';

@Module({
  controllers: [AdministratorController],
  providers: [AdministratorService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }, {
      provide: APP_GUARD,
      useClass: RolesGuard
    }],
  imports: [DatabaseModule]
})
export class AdministratorModule { }
