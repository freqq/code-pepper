import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EpisodeGraphqlDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;
}
