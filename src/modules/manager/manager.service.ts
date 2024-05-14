import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ManagerService {
  constructor(private prisma: DatabaseService) { }

  async sendAction(managerId: number): Promise<{ msg: string }> {
    const manager = await this.prisma.manager.findUnique({
      where: { id: managerId },
    });

    if (!manager) {
      return {
        msg: 'Manager not found.'
      };
    }

    if (manager.occurrence === 1) {
      await this.prisma.manager.update({
        where: { id: managerId },
        data: { occurrence: 0 },
      });
      return {
        msg: 'Action successful.'
      };
    } else {
      return {
        msg: 'Sorry, you have to wait until 10:00 a.m. tomorrow for your next click or contact your administrator.'
      };
    }
  }

  async resetOccurrences(): Promise<void> {
    await this.prisma.manager.updateMany({
      where: { occurrence: 0 },
      data: { occurrence: 1 },
    });
  }
}
