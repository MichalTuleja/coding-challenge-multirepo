import { Controller, Dependencies, Get } from '@nestjs/common';
import { BaseService } from './base.service';

@Controller()
@Dependencies(BaseService)
export class BaseController {
  constructor(baseService) {
    this.baseService = baseService;
  }

  @Get()
  getHello() {
    return this.baseService.getHello();
  }
}
