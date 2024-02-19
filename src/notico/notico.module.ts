import { Module } from '@nestjs/common';
import { NoticoService } from './notico.service';
import { NoticoController } from './notico.controller';

@Module({
  providers: [NoticoService],
  controllers: [NoticoController]
})
export class NoticoModule {}
