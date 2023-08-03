import { AutoMap } from '@automapper/classes';
import { EpisodeEntity } from 'src/main/episode/infrastructure/episode.entity';

export class CreateCharacterEntityDto {
  @AutoMap()
  name: string;

  @AutoMap()
  planet?: string;

  @AutoMap()
  episodes: EpisodeEntity[];
}
