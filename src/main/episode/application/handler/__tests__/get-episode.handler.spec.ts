import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeRepository } from 'src/main/episode/infrastructure/episode.repository';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { EpisodeMapper } from 'src/main/episode/domain/episode.mapper';
import { GetEpisodeHandler } from '../get-episode.handler';
import { EpisodeNotFound } from 'src/common/exceptions/episode-not-found.exception';

const ID = '827b1356-ce96-4db2-a584-182479c36d63';

const findByIdMock = jest.fn();

describe('GetEpisodeHandler', () => {
  let handler: GetEpisodeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        GetEpisodeHandler,
        EpisodeMapper,
        {
          provide: EpisodeRepository,
          useValue: {
            findById: findByIdMock,
          },
        },
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
      ],
    }).compile();

    handler = module.get<GetEpisodeHandler>(GetEpisodeHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should execute the query and return an episode', async () => {
      // Arrange
      const episodeEntity = { id: ID, name: 'Episode name', version: 1 };
      findByIdMock.mockReturnValueOnce(episodeEntity);

      // Act
      const result = await handler.execute({ id: ID });

      // Assert
      expect(findByIdMock).toHaveBeenCalledTimes(1);
      expect(findByIdMock).toHaveBeenCalledWith(ID);

      expect(result).toEqual({
        id: episodeEntity.id,
        name: episodeEntity.name,
      });
    });

    test('should execute the query and throw an exception if episode does not exist', async () => {
      // Arrange
      const id = '827b1356-ce96-4db2-a584-182479c36d63';
      findByIdMock.mockReturnValueOnce(null);

      // Act and assert
      await expect(handler.execute({ id })).rejects.toThrow(EpisodeNotFound);
    });
  });
});
