import { ICommand } from '@nestjs/cqrs';
import { CreateCharacterDto } from '../../interface/dto/create-character.dto';

export class CreateCharacterCommand implements ICommand {
  constructor(readonly createDto: CreateCharacterDto) {}
}
