import { Injectable } from '@nestjs/common';
import { OtelMethodCounter, Span, Traceable, TraceService, WideEventService } from 'nestjs-otel';
import { Actor } from './actor.entity';

const actor = new Actor();
actor.id = 1;
actor.name = 'Fabrício Boliveira';
actor.status = 'active';
actor.createdAt = new Date();
actor.updatedAt = new Date();

@Injectable()
@Traceable()
export class ActorService {
  constructor(
    private readonly traceService: TraceService,
    private readonly wideEvent: WideEventService,
  ) {}

  @OtelMethodCounter()
  async findOne(id: number): Promise<Actor> {
    this.wideEvent.setMany({
      'actor.id': id,
      'actor.status': actor.status,
    });
    return { ...actor, ...{ id } };
  }

  @OtelMethodCounter()
  async findAll(): Promise<Actor[]> {
    this.wideEvent.set('actor.count', 1);
    return [actor];
  }

  async triggerError(): Promise<Actor[]> {
    throw new Error('force-error');
  }
}
