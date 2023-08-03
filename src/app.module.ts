import { Module } from '@nestjs/common';

import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from './common/logger/logger.module';
import { CharacterModule } from './main/character/character.module';
import { EpisodeModule } from './main/episode/episode.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './config/db.config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    LoggerModule,
    CharacterModule,
    EpisodeModule,
    TypeOrmModule.forRoot({ ...dataSource, autoLoadEntities: true }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        }),
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class AppModule {}
