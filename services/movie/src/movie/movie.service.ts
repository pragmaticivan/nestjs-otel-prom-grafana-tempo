import { Injectable } from '@nestjs/common';
import { OtelMethodCounter, Span, TraceService } from 'nestjs-otel';
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
  ) {}

  @Span('findOne section')
  @OtelMethodCounter()
  async findOne(id: number): Promise<Movie> {
    const currentSpan = this.traceService.getSpan();
    currentSpan.addEvent('some event');
    currentSpan.end();
    const resp = await this.getActor();

    return {
      ...factoryMovie(),
      ...{ id },
      ...{ actor: resp.data },
    };
  }

  @Span('findAll section')
  @OtelMethodCounter()
  async findAll(): Promise<Movie[]> {
    const resp = await this.getActor();

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
