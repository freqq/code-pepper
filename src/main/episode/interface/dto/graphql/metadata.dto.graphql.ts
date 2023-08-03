import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MetadataGraphql {
  @Field()
  page: number;

  @Field()
  take: number;

  @Field()
  itemCount: number;

  @Field()
  pageCount: number;

  @Field()
  hasPreviousPage: boolean;

  @Field()
  hasNextPage: boolean;
}
