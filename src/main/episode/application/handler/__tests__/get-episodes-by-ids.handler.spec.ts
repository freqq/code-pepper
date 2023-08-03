import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeRepository } from 'src/main/episode/infrastructure/episode.repository';
import { GetEpisodesByIdsHandler } from '../get-episodes-by-ids.handler';

const ID = '827b1356-ce96-4db2-a584-182479c36d63';

const findManyByIdsMock = jest.fn();

describe('GetEpisodesByIdsHandler', () => {
  let handler: GetEpisodesByIdsHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetEpisodesByIdsHandler,
        {
          provide: EpisodeRepository,
          useValue: {
            findManyByIds: findManyByIdsMock,
          },
        },
      ],
    }).compile();

    handler = module.get<GetEpisodesByIdsHandler>(GetEpisodesByIdsHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should execute the query and return an episode', async () => {
      // Arrange
      const episodeEntities = [{ id: ID, name: 'Episode name', version: 1 }];
      findManyByIdsMock.mockReturnValueOnce(episodeEntities);

      // Act
      const result = await handler.execute({ ids: [ID] });

      // Assert
      expect(findManyByIdsMock).toHaveBeenCalledTimes(1);
      expect(findManyByIdsMock).toHaveBeenCalledWith([ID]);

      expect(result).toEqual(episodeEntities);
    });
  });
});
