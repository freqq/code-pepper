import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { EpisodeGraphqlDto } from './dto/graphql/episode.dto.graphql';
import { GetEpisodeQuery } from '../application/query/get-episode.query';
import { CreateEpisodeCommand } from '../application/command/create-episode.command';
import { UpdateEpisodeCommand } from '../application/command/update-episode.command';
import { UpdateEpisodeInput } from './dto/graphql/update-episode.input.graphql';
import { DeleteEpisodeCommand } from '../application/command/delete-episode.command';
import { CreateEpisodeInput } from './dto/graphql/create-episode.input.graphql';
import { GetEpisodesInput } from './dto/graphql/get-episodes.input.graphql';
import { GetEpisodesQuery } from '../application/query/get-episodes.query';
import { PaginatedEpisodesDto } from './dto/graphql/paginated-episodes.dto.graphql';

@Resolver(() => EpisodeGraphqlDto)
export class EpisodeResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => PaginatedEpisodesDto)
  async getEpisodes(@Args('getInput') getInput: GetEpisodesInput) {
    return this.queryBus.execute(new GetEpisodesQuery(getInput));
  }

  @Query(() => EpisodeGraphqlDto)
  getEpisodeById(@Args('id') id: string) {
    return this.queryBus.execute(new GetEpisodeQuery(id));
  }

  @Mutation(() => EpisodeGraphqlDto)
  createEpisode(@Args('createInput') createInput: CreateEpisodeInput) {
    return this.commandBus.execute(new CreateEpisodeCommand(createInput));
  }

  @Mutation(() => Boolean)
  updateEpisode(@Args('updateInput') updateInput: UpdateEpisodeInput) {
    return this.commandBus.execute(
      new UpdateEpisodeCommand(updateInput.id, updateInput),
    );
  }

  @Mutation(() => Boolean)
  deleteEpisode(@Args('id') id: string) {
    return this.commandBus.execute(new DeleteEpisodeCommand(id));
  }
}
