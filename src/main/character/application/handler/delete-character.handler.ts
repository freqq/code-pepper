import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCharacterCommand } from '../command/delete-character.command';
import { LoggerService } from 'src/common/logger/logger.service';
import { CharacterRepository } from '../../infrastructure/character.repository';
import { CharacterNotFound } from 'src/common/exceptions/character-not-found.exception';

@CommandHandler(DeleteCharacterCommand)
export class DeleteCharacterHandler implements ICommandHandler {
  constructor(
    private readonly repository: CharacterRepository,
    private readonly logger: LoggerService,
  ) {}

  async execute({ id }: DeleteCharacterCommand) {
    const episode = await this.repository.exists(id);

    if (!episode) {
      throw new CharacterNotFound(id);
    }

    await this.repository.deleteById(id);
    this.logger.log(`Deleted character with id [${id}]`);
  }
}
