import { Injectable } from '@nestjs/common';
import { OtelMethodCounter, Span, TraceService, WideEventService } from 'nestjs-otel';
import { Movie } from './movie.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Actor } from './actor.entity';

function factoryMovie() {
  const movie = new Movie();
  movie.id = 1;
  movie.name = 'Faroeste Caboclo';
  movie.status = 'active';
  movie.year = 2013;
  movie.createdAt = new Date();
  movie.updatedAt = new Date();

  return movie;
}

@Injectable()
export class MovieService {
  constructor(
    private readonly traceService: TraceService,
    private readonly httpService: HttpService,
    private readonly wideEvent: WideEventService,
  ) {}

  @Span({onResult: (result: Movie) => {
      return {attributes:  { customAttrId: result.id }};
    }
  })
  @OtelMethodCounter()
  async findOne(id: number): Promise<Movie> {
    const currentSpan = this.traceService.getSpan();
    currentSpan.addEvent('some event');
    currentSpan.end();

    this.wideEvent.set('movie.id', id);
    const stopTimer = this.wideEvent.startTimer('actor.fetch.duration_ms');
    const resp = await this.getActor();
    stopTimer();

    this.wideEvent.set('actor.id', resp.data.id);

    return {
      ...factoryMovie(),
      ...{ id },
      ...{ actor: resp.data },
    };
  }

  @Span('findAll section', {onResult: (result: Movie[]) => {
      return {attributes:  { customAttrId: result[0]?.id }};
    }})
  @OtelMethodCounter()
  async findAll(): Promise<Movie[]> {
    const stopTimer = this.wideEvent.startTimer('actor.fetch.duration_ms');
    const resp = await this.getActor();
    stopTimer();

    this.wideEvent.setMany({
      'movie.count': 1,
      'actor.id': resp.data.id,
    });

    return [
      {
        ...factoryMovie(),
        ...{ actor: resp.data },
      },
    ];
  }

  getActor(): Promise<AxiosResponse<Actor>> {
    return this.httpService.axiosRef.get('http://actor:5555/actors/1');
  }

  async triggerError(): Promise<Movie[]> {
    throw new Error('force-error');
  }
}
