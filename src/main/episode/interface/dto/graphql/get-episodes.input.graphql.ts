import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetEpisodesInput {
  @Field({ defaultValue: 1 })
  page?: number;

  @Field()
  skip: number;

  @Field()
  take: number;
}
