import { ApiProperty } from '@nestjs/swagger';

export class Actor {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Fabrício Boliveira' })
  name: string;

  @ApiProperty({ example: 'active' })
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
