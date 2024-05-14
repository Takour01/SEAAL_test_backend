import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { Roles } from 'src/decorators/role/role.decorator';
import { ErrorsUtil } from 'src/utils/errors-util/errors-util';
import { QueryDto } from './dto/query-dto';

@Controller('administrators')
export class AdministratorController {
  constructor(private administratorService: AdministratorService) { }

  @Roles(["Administrator"])
  @Get('managers')
  listManagers(@Query() query?: QueryDto) {
    // return name
    return this.administratorService.listManagers(query ? query.name ? query.name : "" : "");
  }
  @Roles(["Administrator"])
  @Post('managers/:id/reset')
  async resetManagerOccurrence(@Param('id') id: number) {
    try {
      await this.administratorService.resetManagerOccurrence(+id);
      return true
    } catch (error) {
      ErrorsUtil.errorHandler(error)
    }
  }
}
