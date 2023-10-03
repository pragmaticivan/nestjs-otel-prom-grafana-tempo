import { ApiProperty } from '@nestjs/swagger';
import { Actor } from './actor.entity';

export class Movie {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Faroeste Caboclo' })
  name: string;

  @ApiProperty({ example: '2013' })
  year: number;

  @ApiProperty({ example: 'active' })
  status: string;

  @ApiProperty()
  actor: Actor;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
