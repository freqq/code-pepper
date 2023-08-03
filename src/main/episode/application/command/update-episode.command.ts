import { ICommand } from '@nestjs/cqrs';
import { EpisodeDto } from '../../interface/dto/episode.dto';

export class UpdateEpisodeCommand implements ICommand {
  constructor(readonly id: string, readonly updateDto: Partial<EpisodeDto>) {}
}
