import { Field, ObjectType } from '@nestjs/graphql';
import { EpisodeGraphqlDto } from './episode.dto.graphql';
import { MetadataGraphql } from './metadata.dto.graphql';

@ObjectType()
export class PaginatedEpisodesDto {
  @Field(() => [EpisodeGraphqlDto])
  data: EpisodeGraphqlDto[];

  @Field()
  meta: MetadataGraphql;
}
