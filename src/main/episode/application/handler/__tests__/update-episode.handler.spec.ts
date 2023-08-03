import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeRepository } from 'src/main/episode/infrastructure/episode.repository';
import { EpisodeNotFound } from 'src/common/exceptions/episode-not-found.exception';
import { UpdateEpisodeHandler } from '../update-episode.handler';

const ID = '827b1356-ce96-4db2-a584-182479c36d63';
const episodeEntity = { name: 'Episode name' };

const existsMock = jest.fn();
const updateMock = jest.fn();

describe('UpdateEpisodeHandler', () => {
  let handler: UpdateEpisodeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateEpisodeHandler,
        {
          provide: EpisodeRepository,
          useValue: {
            exists: existsMock,
            update: updateMock,
          },
        },
      ],
    }).compile();

    handler = module.get<UpdateEpisodeHandler>(UpdateEpisodeHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should execute the command and update an episode', async () => {
      // Arrange
      existsMock.mockReturnValueOnce(true);

      // Act
      await handler.execute({
        id: ID,
        updateDto: episodeEntity,
      });

      // Assert
      expect(existsMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith(ID, episodeEntity);
    });

    test('should execute the command and throw an exception if episode does not exist', async () => {
      // Arrange
      existsMock.mockReturnValueOnce(false);

      // Act and assert
      await expect(
        handler.execute({ id: ID, updateDto: episodeEntity }),
      ).rejects.toThrow(EpisodeNotFound);
    });
  });
});
