import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ManagerService } from '../manager/manager.service';
import { CronJob } from 'cron';
import { ManagerModule } from '../manager/manager.module';

@Module({
  imports: [ScheduleModule.forRoot(), ManagerModule],
  providers: [
    {
      provide: 'SCHEDULE_TASKS',
      useFactory: (managerService: ManagerService) => {
        const job = new CronJob('0 0 10 * * *', () => {
          // const job = new CronJob('*/1 * * * *', () => {
          managerService.resetOccurrences();
        });
        job.start();
      },
      inject: [ManagerService],
    },
  ],
})
export class TasksModule { }
