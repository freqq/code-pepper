import { ICommand } from '@nestjs/cqrs';
import { CreateCharacterDto } from '../../interface/dto/create-character.dto';

export class UpdateCharacterCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly updateDto: Partial<CreateCharacterDto>,
  ) {}
}
