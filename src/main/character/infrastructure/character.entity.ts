import { AutoMap } from '@automapper/classes';
import { MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from 'src/common/db/base.entity';
import { EpisodeEntity } from 'src/main/episode/infrastructure/episode.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class CharacterEntity extends BaseEntity {
  @AutoMap()
  @Column({ nullable: false, unique: true })
  @MinLength(4)
  @MaxLength(40)
  name!: string;

  @AutoMap()
  @Column({ type: 'varchar', nullable: true })
  @MinLength(4)
  @MaxLength(40)
  planet: string;

  @AutoMap()
  @ManyToMany(() => EpisodeEntity, (episode) => episode.characters)
  @JoinTable()
  episodes: EpisodeEntity[];
}
