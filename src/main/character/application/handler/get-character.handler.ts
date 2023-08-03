import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCharacterQuery } from '../query/get-character.query';
import { CharacterRepository } from '../../infrastructure/character.repository';
import { CharacterNotFound } from 'src/common/exceptions/character-not-found.exception';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CharacterEntity } from '../../infrastructure/character.entity';
import { CharacterDto } from '../../interface/dto/character.dto';

@QueryHandler(GetCharacterQuery)
export class GetCharacterHandler implements IQueryHandler {
  constructor(
    private readonly repository: CharacterRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async execute({ id }: GetCharacterQuery) {
    const characters = await this.repository.findById(id);

    if (!characters.length) {
      throw new CharacterNotFound(id);
    }

    return this.mapper.map(characters[0], CharacterEntity, CharacterDto);
  }
}
