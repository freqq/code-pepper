import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CharacterEntity } from './character.entity';
import { CreateCharacterEntityDto } from '../interface/dto/create-character-entity.dto';

@Injectable()
export class CharacterRepository {
  constructor(
    @InjectRepository(CharacterEntity)
    private readonly repository: Repository<CharacterEntity>,
  ) {}

  create(createDto: CreateCharacterEntityDto) {
    return this.repository.create(createDto);
  }

  exists(id: string) {
    return this.repository.exist({ where: { id } });
  }

  save(characterEntity: CharacterEntity) {
    return this.repository.save(characterEntity);
  }

  find(skip: number, take: number) {
    return this.repository.findAndCount({
      take,
      skip,
      relations: ['episodes'],
    });
  }

  findById(id: string) {
    return this.repository.find({
      where: { id },
      relations: ['episodes'],
      take: 1,
    });
  }

  update(id: string, updateDto: Partial<CreateCharacterEntityDto>) {
    return this.repository.update(id, updateDto);
  }

  deleteById(id: string) {
    return this.repository.delete(id);
  }
}
