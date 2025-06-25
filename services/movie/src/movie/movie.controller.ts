import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { OtelCounter } from 'nestjs-otel';
import {
  Counter,
} from '@opentelemetry/api';

@Controller('movies')
@ApiTags('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

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

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: Movie })
  findOne(@Param('id') id) {
    return this.movieService.findOne(id);
  }
}
