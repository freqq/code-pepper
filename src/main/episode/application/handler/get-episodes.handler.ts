import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEpisodesQuery } from '../query/get-episodes.query';
import { EpisodeRepository } from '../../infrastructure/episode.repository';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EpisodeEntity } from '../../infrastructure/episode.entity';
import { EpisodeDto } from '../../interface/dto/episode.dto';

@QueryHandler(GetEpisodesQuery)
export class GetEpisodesHandler implements IQueryHandler {
  constructor(
    private readonly repository: EpisodeRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute({ pageOptionsDto }: GetEpisodesQuery) {
    const { skip, take } = pageOptionsDto;
    const [entities, itemCount] = await this.repository.find(skip, take);
    const pageMeta = new PageMetaDto({ itemCount, pageOptionsDto });

    const mappedEntities = this.mapper.mapArray(
      entities,
      EpisodeEntity,
      EpisodeDto,
    );

    return new PageDto(mappedEntities, pageMeta);
  }
}
