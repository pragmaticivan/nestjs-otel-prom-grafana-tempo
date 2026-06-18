import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { WideEventField, WideEventService } from 'nestjs-otel';
import { Actor } from './actor.entity';
import { ActorService } from './actor.service';

@Controller('actors')
@ApiTags('actors')
export class ActorController {
  constructor(
    private readonly actorService: ActorService,
    private readonly wideEvent: WideEventService,
  ) {}

  @Get('')
  list(): Promise<Actor[]> {
    return this.actorService.findAll();
  }

  @Get('error')
  forceError(): Promise<Actor[]> {
    return this.actorService.triggerError();
  }

  @Get('wide-event')
  @WideEventField('actor.demo.result_count', (result: string[]) => result.length)
  wideEventDemo(): string[] {
    this.wideEvent.set('actor.demo.user_id', 'u-42');
    this.wideEvent.setMany({
      'actor.demo.tenant': 'acme',
      'actor.demo.plan': 'pro',
    });
    this.wideEvent.increment('actor.demo.db_queries');
    this.wideEvent.increment('actor.demo.db_queries');
    const stop = this.wideEvent.startTimer('actor.demo.work_ms');
    stop();
    return ['neo', 'trinity', 'morpheus'];
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: Actor })
  findOne(@Param('id') id) {
    return this.actorService.findOne(id);
  }
}
