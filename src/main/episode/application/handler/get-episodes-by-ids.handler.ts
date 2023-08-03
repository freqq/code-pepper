import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EpisodeRepository } from '../../infrastructure/episode.repository';
import { GetEpisodesByIds } from '../query/get-episodes-by-ids.query';

@QueryHandler(GetEpisodesByIds)
export class GetEpisodesByIdsHandler implements IQueryHandler {
  constructor(private readonly repository: EpisodeRepository) {}

  async execute({ ids }: GetEpisodesByIds) {
    return this.repository.findManyByIds(ids);
  }
}
