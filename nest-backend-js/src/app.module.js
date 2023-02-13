import { Module } from '@nestjs/common';
import { BaseModule } from './base.module';
import { PokeModule } from './poke.module';

@Module({
  imports: [
    BaseModule,
    PokeModule,
  ],
})
export class AppModule {}
