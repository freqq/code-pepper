import { Module } from '@nestjs/common';
import { EpisodeController } from './interface/episode.controller';
import { Handlers } from './application/handler';
import { EpisodeRepository } from './infrastructure/episode.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeEntity } from './infrastructure/episode.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { EpisodeMapper } from './domain/episode.mapper';
import { EpisodeResolver } from './interface/episode.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([EpisodeEntity]), CqrsModule],
  controllers: [EpisodeController],
  providers: [...Handlers, EpisodeRepository, EpisodeMapper, EpisodeResolver],
})
export class EpisodeModule {}
