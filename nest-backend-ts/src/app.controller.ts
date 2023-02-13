import { Controller, Get, Put, Patch, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<string> {
    return `Hello ${id}`;
  }

  // @Put(':id')
  // async updateById(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto): Promise<string> {
  //   // TODO: Validate id

  //   // TODO: Update the entity

  //   return `OK ${id}`;
  // }

  // @Patch(':id')

  // @Get('calculate_damage')
  // getDamage(@Query() query): string {
  //   // TODO: Validate id1 to match pokemon id
  //   // TODO: Validate id2 to match pokemon id
  //   return `Hello ${query.id1} ${query.id2}`;
  // }
}
