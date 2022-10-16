import { Controller, Get } from '@nestjs/common';

import { OpmetRes } from '@ibl-test-task/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data')
  getData(): OpmetRes {
    return this.appService.getData();
  }
}
