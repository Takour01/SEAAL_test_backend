import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AdministratorService {
  constructor(private prisma: DatabaseService) { }

  async listManagers(name: string) {


    return this.prisma.manager.findMany({
      select: {
        id: true,
        name: true,
        occurrence: true
      },
      where: {
        name: {
          contains: name
        }
      }
    });
  }

  async resetManagerOccurrence(managerId: number): Promise<void> {
    await this.prisma.manager.update({
      where: { id: managerId },
      data: { occurrence: 1 },
    });
  }
}
