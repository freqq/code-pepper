import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateCharacterCommand } from '../command/create-character.command';
import { CharacterRepository } from '../../infrastructure/character.repository';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CharacterEntity } from '../../infrastructure/character.entity';
import { CharacterDto } from '../../interface/dto/character.dto';
import { GetEpisodesByIds } from 'src/main/episode/application/query/get-episodes-by-ids.query';

@CommandHandler(CreateCharacterCommand)
export class CreateCharacterHandler implements ICommandHandler {
  constructor(
    private readonly repository: CharacterRepository,
    private readonly queryBus: QueryBus,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute({ createDto }: CreateCharacterCommand) {
    const episodes = await this.queryBus.execute(
      new GetEpisodesByIds(createDto.episodes),
    );

    const character = this.repository.create({
      ...createDto,
      episodes,
    });

    await this.repository.save(character);
    return this.mapper.map(character, CharacterEntity, CharacterDto);
  }
}
