import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeController } from '../episode.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const commandExecuteMock = jest.fn();
const queryExecuteMock = jest.fn();

const EPISODE_ID = '827b1356-ce96-4db2-a584-182479c36d63';

describe('EpisodeController', () => {
  let episodeController: EpisodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodeController],
      providers: [
        { provide: CACHE_MANAGER, useValue: {} },
        {
          provide: CommandBus,
          useValue: {
            execute: commandExecuteMock,
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: queryExecuteMock,
          },
        },
      ],
    }).compile();

    episodeController = module.get<EpisodeController>(EpisodeController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEpisodes', () => {
    test('should execute query for list of episodes', async () => {
      // Arange
      const pageOptions = { skip: 0, take: 10 };

      // Act
      await episodeController.getEpisodes(pageOptions);

      // Assert
      expect(queryExecuteMock).toHaveBeenCalledTimes(1);
      expect(queryExecuteMock).toHaveBeenCalledWith({
        pageOptionsDto: pageOptions,
      });
    });
  });

  describe('getEpisodeById', () => {
    test('should execute query for certain episode', async () => {
      // Act
      await episodeController.getEpisodeById(EPISODE_ID);

      // Assert
      expect(queryExecuteMock).toHaveBeenCalledTimes(1);
      expect(queryExecuteMock).toHaveBeenCalledWith({ id: EPISODE_ID });
    });
  });

  describe('createEpisode', () => {
    test('should execute command to create an episode', async () => {
      // Arrange
      const createDto = { name: 'Episode name' };

      // Act
      await episodeController.createEpisode(createDto);

      // Assert
      expect(commandExecuteMock).toHaveBeenCalledTimes(1);
      expect(commandExecuteMock).toHaveBeenCalledWith({ createDto });
    });
  });

  describe('deleteEpisode', () => {
    test('should execute command to delete an episode', async () => {
      // Act
      await episodeController.deleteEpisode(EPISODE_ID);

      // Assert
      expect(commandExecuteMock).toHaveBeenCalledTimes(1);
      expect(commandExecuteMock).toHaveBeenCalledWith({ id: EPISODE_ID });
    });
  });

  describe('updateEpisode', () => {
    test('should execute command to update an episode', async () => {
      // Arrange
      const updateDto = { name: 'New name' };

      // Act
      await episodeController.updateEpisode(EPISODE_ID, updateDto);

      // Assert
      expect(commandExecuteMock).toHaveBeenCalledTimes(1);
      expect(commandExecuteMock).toHaveBeenCalledWith({
        id: EPISODE_ID,
        updateDto,
      });
    });
  });
});
