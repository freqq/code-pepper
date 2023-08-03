import { ICommand } from '@nestjs/cqrs';
import { CreateEpisodeDto } from '../../interface/dto/create-episode.dto';

export class CreateEpisodeCommand implements ICommand {
  constructor(readonly createDto: CreateEpisodeDto) {}
}
