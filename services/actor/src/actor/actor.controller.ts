import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Actor } from './actor.entity';
import { ActorService } from './actor.service';

@Controller('actors')
@ApiTags('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get('')
  list(): Promise<Actor[]> {
    return this.actorService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: Actor })
  findOne(@Param('id') id) {
    return this.actorService.findOne(id);
  }
}
