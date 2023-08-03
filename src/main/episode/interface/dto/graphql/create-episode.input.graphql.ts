import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEpisodeInput {
  @Field()
  name: string;
}
