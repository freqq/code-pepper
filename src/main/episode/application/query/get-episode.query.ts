import { IQuery } from '@nestjs/cqrs';

export class GetEpisodeQuery implements IQuery {
  constructor(readonly id: string) {}
}
