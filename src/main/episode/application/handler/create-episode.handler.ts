import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEpisodeCommand } from '../command/create-episode.command';
import { EpisodeRepository } from '../../infrastructure/episode.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EpisodeEntity } from '../../infrastructure/episode.entity';
import { EpisodeDto } from '../../interface/dto/episode.dto';

@CommandHandler(CreateEpisodeCommand)
export class CreateEpisodeHandler implements ICommandHandler {
  constructor(
    private readonly repository: EpisodeRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute({ createDto }: CreateEpisodeCommand) {
    const episode = this.repository.create(createDto);
    await this.repository.save(episode);
    return this.mapper.map(episode, EpisodeEntity, EpisodeDto);
  }
}
