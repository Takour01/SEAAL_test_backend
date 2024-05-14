import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ManagerModule } from './modules/manager/manager.module';
import { AdministratorModule } from './modules/administrator/administrator.module';
import { TasksModule } from './modules/tasks/tasks.module';


@Module({
  imports: [DatabaseModule, AuthModule, ManagerModule, AdministratorModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
