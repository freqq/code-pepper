import { CreateCharacterHandler } from './create-character.handler';
import { DeleteCharacterHandler } from './delete-character.handler';
import { GetCharacterHandler } from './get-character.handler';
import { GetCharactersHandler } from './get-characters.handler';
import { UpdateCharacterHandler } from './update-character.handler';

export const Handlers = [
  CreateCharacterHandler,
  DeleteCharacterHandler,
  GetCharacterHandler,
  GetCharactersHandler,
  UpdateCharacterHandler,
];
