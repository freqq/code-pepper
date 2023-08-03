import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeRepository } from 'src/main/episode/infrastructure/episode.repository';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { EpisodeMapper } from 'src/main/episode/domain/episode.mapper';
import { GetEpisodesHandler } from '../get-episodes.handler';

const findMock = jest.fn();

describe('GetEpisodesHandler', () => {
  let handler: GetEpisodesHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        GetEpisodesHandler,
        EpisodeMapper,
        {
          provide: EpisodeRepository,
          useValue: {
            find: findMock,
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

    handler = module.get<GetEpisodesHandler>(GetEpisodesHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should execute the query and return list of episodes', async () => {
      // Arrange
      const ID = '827b1356-ce96-4db2-a584-182479c36d63';
      const episodeEntities = [{ id: ID, name: 'Episode name', version: 1 }];
      const paginationDto = {
        hasNextPage: false,
        hasPreviousPage: false,
        itemCount: 5,
        page: undefined,
        pageCount: 1,
        take: 10,
      };

      findMock.mockReturnValueOnce([episodeEntities, 5]);

      // Act
      const result = await handler.execute({
        pageOptionsDto: { skip: 0, take: 10 },
      });

      // Assert
      expect(findMock).toHaveBeenCalledTimes(1);
      expect(findMock).toHaveBeenCalledWith(0, 10);

      expect(result).toEqual({
        data: episodeEntities.map(({ version, ...rest }) => rest),
        meta: paginationDto,
      });
    });
  });
});
