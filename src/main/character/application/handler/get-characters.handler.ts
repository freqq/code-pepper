import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCharactersQuery } from '../query/get-characters.query';
import { CharacterRepository } from '../../infrastructure/character.repository';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { CharacterEntity } from '../../infrastructure/character.entity';
import { PageDto } from 'src/common/dto/page.dto';
import { CharacterDto } from '../../interface/dto/character.dto';

@QueryHandler(GetCharactersQuery)
export class GetCharactersHandler implements IQueryHandler {
  constructor(
    private readonly repository: CharacterRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute({ pageOptionsDto }: GetCharactersQuery) {
    const { skip, take } = pageOptionsDto;
    const [entities, itemCount] = await this.repository.find(skip, take);
    const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });

    const mappedEntities = this.mapper.mapArray(
      entities,
      CharacterEntity,
      CharacterDto,
    );

    return new PageDto(mappedEntities, pageMeta);
  }
}
