import { Module } from '@nestjs/common';
import { CharacterController } from './interface/character.controller';
import { CharacterRepository } from './infrastructure/character.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEntity } from './infrastructure/character.entity';
import { Handlers } from './application/handler';
import { CharacterMapper } from './domain/character.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterEntity]), CqrsModule],
  controllers: [CharacterController],
  providers: [...Handlers, CharacterRepository, CharacterMapper],
})
export class CharacterModule {}
