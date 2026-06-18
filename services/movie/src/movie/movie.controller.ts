import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { OtelCounter, WideEventField, WideEventService } from 'nestjs-otel';
import {
  Counter,
} from '@opentelemetry/api';

@Controller('movies')
@ApiTags('movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly wideEvent: WideEventService,
  ) {}

  @Get('')
  list(
    @OtelCounter('movie.service.controller.counter', { description: 'counter 1 description' }) counter1: Counter
  ): Promise<Movie[]> {
    counter1.add(1, { method: 'findAll' });
    return this.movieService.findAll();
  }

  @Get('error')
  forceError(): Promise<Movie[]> {
    return this.movieService.triggerError();
  }

  @Get('wide-event')
  @WideEventField('movie.demo.result_count', (result: string[]) => result.length)
  wideEventDemo(): string[] {
    this.wideEvent.set('movie.demo.user_id', 'u-7');
    this.wideEvent.setMany({
      'movie.demo.tenant': 'acme',
      'movie.demo.plan': 'pro',
    });
    this.wideEvent.increment('movie.demo.db_queries');
    this.wideEvent.increment('movie.demo.db_queries');
    const stop = this.wideEvent.startTimer('movie.demo.work_ms');
    stop();
    return ['faroeste', 'caboclo'];
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: Movie })
  findOne(@Param('id') id) {
    return this.movieService.findOne(id);
  }
}
