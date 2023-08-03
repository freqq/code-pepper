import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetEpisodeQuery } from '../query/get-episode.query';
import { EpisodeRepository } from '../../infrastructure/episode.repository';
import { EpisodeNotFound } from 'src/common/exceptions/episode-not-found.exception';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EpisodeEntity } from '../../infrastructure/episode.entity';
import { EpisodeDto } from '../../interface/dto/episode.dto';

@QueryHandler(GetEpisodeQuery)
export class GetEpisodeHandler implements IQueryHandler {
  constructor(
    private readonly repository: EpisodeRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute({ id }: GetEpisodeQuery) {
    const episode = await this.repository.findById(id);

    if (!episode) {
      throw new EpisodeNotFound(id);
    }

    return this.mapper.map(episode, EpisodeEntity, EpisodeDto);
  }
}
