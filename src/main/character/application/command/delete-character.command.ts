import { ICommand } from '@nestjs/cqrs';

export class DeleteCharacterCommand implements ICommand {
  constructor(readonly id: string) {}
}
