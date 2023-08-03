import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCharacterDto {
  @ApiProperty({
    description: 'Name of the character',
    type: String,
    example: 'Luke Skywalker',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Planet name where the character was born',
    nullable: true,
    type: String,
    example: 'Alderaan',
  })
  @IsNotEmpty()
  @IsString()
  planet?: string;

  @ApiProperty({
    description: 'List of episodes ids',
    type: [String],
    example: ['id1', 'id2', 'id3'],
  })
  @IsArray()
  episodes: string[];
}
