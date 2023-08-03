import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EpisodeRepository } from '../../infrastructure/episode.repository';
import { UpdateEpisodeCommand } from '../command/update-episode.command';
import { EpisodeNotFound } from 'src/common/exceptions/episode-not-found.exception';

@CommandHandler(UpdateEpisodeCommand)
export class UpdateEpisodeHandler implements ICommandHandler {
  constructor(private readonly repository: EpisodeRepository) {}

  async execute({ id, updateDto }: UpdateEpisodeCommand) {
    const episode = await this.repository.exists(id);

    if (!episode) {
      throw new EpisodeNotFound(id);
    }

    return await this.repository.update(id, updateDto);
  }
}
