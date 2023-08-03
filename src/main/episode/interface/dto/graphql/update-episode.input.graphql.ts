import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEpisodeInput {
  @Field()
  id: string;

  @Field()
  name: string;
}
