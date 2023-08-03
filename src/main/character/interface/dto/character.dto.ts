import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CharacterDto {
  @AutoMap()
  @ApiProperty({
    description: 'Name of the character',
    type: String,
    example: 'Luke Skywalker',
  })
  name: string;

  @AutoMap()
  @ApiProperty({
    description: 'Planet name where the character was born',
    nullable: true,
    type: String,
    example: 'Alderaan',
  })
  planet?: string;

  @AutoMap()
  @ApiProperty({
    description: 'List of episodes',
    type: [String],
    example: ['NEW HOPE', 'EMPIRE', 'JEDI'],
  })
  episodes: string[];
}
