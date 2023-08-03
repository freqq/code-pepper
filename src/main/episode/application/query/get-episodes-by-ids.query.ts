import { IQuery } from '@nestjs/cqrs';

export class GetEpisodesByIds implements IQuery {
  constructor(readonly ids: string[]) {}
}
