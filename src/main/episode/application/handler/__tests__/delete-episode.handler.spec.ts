import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeRepository } from 'src/main/episode/infrastructure/episode.repository';
import { DeleteEpisodeHandler } from '../delete-episode.handler';
import { EpisodeNotFound } from 'src/common/exceptions/episode-not-found.exception';
import { LoggerService } from 'src/common/logger/logger.service';

const deleteByIdMock = jest.fn();
const existsMock = jest.fn();
const logMock = jest.fn();

describe('DeleteEpisodeHandler', () => {
  let handler: DeleteEpisodeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LoggerService,
          useValue: { log: logMock },
        },
        DeleteEpisodeHandler,
        {
          provide: EpisodeRepository,
          useValue: {
            exists: existsMock,
            deleteById: deleteByIdMock,
          },
        },
      ],
    }).compile();

    handler = module.get<DeleteEpisodeHandler>(DeleteEpisodeHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should execute the command and delete an episode', async () => {
      // Arrange
      const id = '827b1356-ce96-4db2-a584-182479c36d63';
      existsMock.mockReturnValueOnce(true);

      // Act
      const result = await handler.execute({ id });

      // Assert
      expect(existsMock).toHaveBeenCalledTimes(1);
      expect(existsMock).toHaveBeenCalledWith(id);

      expect(deleteByIdMock).toHaveBeenCalledTimes(1);
      expect(deleteByIdMock).toHaveBeenCalledWith(id);

      expect(result).toEqual(true);
    });

    test('should execute the command and throw an exception if episode does not exist', async () => {
      // Arrange
      const id = '827b1356-ce96-4db2-a584-182479c36d63';
      existsMock.mockReturnValueOnce(false);

      // Act and assert
      await expect(handler.execute({ id })).rejects.toThrow(EpisodeNotFound);
    });
  });
});
