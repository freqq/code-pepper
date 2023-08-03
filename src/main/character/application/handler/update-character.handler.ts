import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { UpdateCharacterCommand } from '../command/update-character.command';
import { CharacterRepository } from '../../infrastructure/character.repository';
import { CharacterNotFound } from 'src/common/exceptions/character-not-found.exception';
import { GetEpisodesByIds } from 'src/main/episode/application/query/get-episodes-by-ids.query';

@CommandHandler(UpdateCharacterCommand)
export class UpdateCharacterHandler implements ICommandHandler {
  constructor(
    private readonly repository: CharacterRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute({ updateDto, id }: UpdateCharacterCommand) {
    const { name, planet } = updateDto;

    const characters = await this.repository.findById(id);

    if (!characters.length) {
      throw new CharacterNotFound(id);
    }

    const [character] = characters;

    const episodes = await this.queryBus.execute(
      new GetEpisodesByIds(updateDto.episodes),
    );

    character.episodes = episodes;
    character.name = name;
    character.planet = planet;

    return await this.repository.save(character);
  }
}
