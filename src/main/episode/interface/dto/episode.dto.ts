import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class EpisodeDto {
  @AutoMap()
  @ApiProperty({
    description: 'Id of the episode',
    type: String,
    example: 'opiaksdoiajsdoiaewq',
  })
  id: string;

  @AutoMap()
  @ApiProperty({
    description: 'Name of the episode',
    type: String,
    example: 'NEW HOPE',
  })
  name: string;
}
