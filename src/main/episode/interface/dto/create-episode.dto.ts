import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @ApiProperty({
    description: 'Name of the episode',
    type: String,
    example: 'NEW HOPE',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
