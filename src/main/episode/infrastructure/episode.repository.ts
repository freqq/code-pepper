import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { EpisodeEntity } from './episode.entity';
import { EpisodeDto } from '../interface/dto/episode.dto';
import { CreateEpisodeDto } from '../interface/dto/create-episode.dto';

@Injectable()
export class EpisodeRepository {
  constructor(
    @InjectRepository(EpisodeEntity)
    private readonly repository: Repository<EpisodeEntity>,
  ) {}

  create(createDto: CreateEpisodeDto) {
    return this.repository.create(createDto);
  }

  exists(id: string) {
    return this.repository.exist({ where: { id } });
  }

  save(characterEntity: EpisodeEntity) {
    return this.repository.save(characterEntity);
  }

  find(skip: number, take: number) {
    return this.repository.findAndCount({ take, skip });
  }

  update(id: string, updateDto: Partial<EpisodeDto>) {
    return this.repository.update(id, updateDto);
  }

  findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  findManyByIds(ids: string[]) {
    return this.repository.find({ where: { id: In(ids) } });
  }

  deleteById(id: string) {
    return this.repository.delete(id);
  }
}
