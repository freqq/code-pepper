import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CharacterEntity } from '../infrastructure/character.entity';
import { CharacterDto } from '../interface/dto/character.dto';

@Injectable()
export class CharacterMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CharacterEntity,
        CharacterDto,
        forMember(
          (destination) => destination.episodes,
          mapFrom((source) => source.episodes.map(({ name }) => name)),
        ),
      );
    };
  }
}
