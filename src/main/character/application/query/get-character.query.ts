import { IQuery } from '@nestjs/cqrs';

export class GetCharacterQuery implements IQuery {
  constructor(readonly id: string) {}
}
