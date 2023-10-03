import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';

@Module({
  providers: [ActorService],
  controllers: [ActorController],
})
export class ActorModule {}
