import { ICommand } from '@nestjs/cqrs';

export class DeleteEpisodeCommand implements ICommand {
  constructor(readonly id: string) {}
}
