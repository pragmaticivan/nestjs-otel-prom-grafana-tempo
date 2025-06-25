import { Injectable } from '@nestjs/common';
import { OtelMethodCounter, Span, TraceService } from 'nestjs-otel';
import { Actor } from './actor.entity';

const actor = new Actor();
actor.id = 1;
actor.name = 'Fabrício Boliveira';
actor.status = 'active';
actor.createdAt = new Date();
actor.updatedAt = new Date();

@Injectable()
export class ActorService {
  constructor(private readonly traceService: TraceService) {}

  @Span('findOne section')
  @OtelMethodCounter()
  async findOne(id: number): Promise<Actor> {
    const currentSpan = this.traceService.getSpan();
    currentSpan.addEvent('some event');
    currentSpan.end();
    return { ...actor, ...{ id } };
  }

  @Span('findAll section')
  @OtelMethodCounter()
  async findAll(): Promise<Actor[]> {
    return [actor];
  }

  async triggerError(): Promise<Actor[]> {
    throw new Error('force-error');
  }
}
