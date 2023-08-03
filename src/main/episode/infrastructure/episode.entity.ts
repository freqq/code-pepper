import { AutoMap } from '@automapper/classes';
import { MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from 'src/common/db/base.entity';
import { CharacterEntity } from 'src/main/character/infrastructure/character.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class EpisodeEntity extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar', nullable: false })
  @MinLength(4)
  @MaxLength(40)
  name!: string;

  @ManyToMany(() => CharacterEntity, (character) => character.episodes)
  characters!: CharacterEntity[];
}
