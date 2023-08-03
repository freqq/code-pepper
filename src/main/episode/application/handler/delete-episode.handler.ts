import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoggerService } from 'src/common/logger/logger.service';
import { DeleteEpisodeCommand } from '../command/delete-episode.command';
import { EpisodeRepository } from '../../infrastructure/episode.repository';
import { EpisodeNotFound } from 'src/common/exceptions/episode-not-found.exception';

@CommandHandler(DeleteEpisodeCommand)
export class DeleteEpisodeHandler implements ICommandHandler {
  constructor(
    private readonly repository: EpisodeRepository,
    private readonly logger: LoggerService,
  ) {}

  async execute({ id }: DeleteEpisodeCommand) {
    const episode = await this.repository.exists(id);

    if (!episode) {
      throw new EpisodeNotFound(id);
    }

    await this.repository.deleteById(id);
    this.logger.log(`Deleted episode with id [${id}]`);

    return true;
  }
}
