import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { EpisodeEntity } from '../infrastructure/episode.entity';
import { EpisodeDto } from '../interface/dto/episode.dto';

@Injectable()
export class EpisodeMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, EpisodeEntity, EpisodeDto);
    };
  }
}
