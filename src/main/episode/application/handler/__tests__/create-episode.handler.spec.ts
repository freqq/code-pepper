import { Test, TestingModule } from '@nestjs/testing';
import { CreateEpisodeHandler } from '../create-episode.handler';
import { EpisodeRepository } from 'src/main/episode/infrastructure/episode.repository';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { EpisodeMapper } from 'src/main/episode/domain/episode.mapper';

const ID = '827b1356-ce96-4db2-a584-182479c36d63';

const createMock = jest.fn();
const saveMock = jest.fn();

describe('CreateEpisodeHandler', () => {
  let handler: CreateEpisodeHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        CreateEpisodeHandler,
        EpisodeMapper,
        {
          provide: EpisodeRepository,
          useValue: {
            create: createMock,
            save: saveMock,
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

    handler = module.get<CreateEpisodeHandler>(CreateEpisodeHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should execute the command and create an episode', async () => {
      // Arrange
      const createDto = { name: 'Episode name' };
      const episodeEntity = { id: ID, name: 'Episode name', version: 1 };
      createMock.mockReturnValueOnce(episodeEntity);

      // Act
      const result = await handler.execute({ createDto });

      // Assert
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(createMock).toHaveBeenCalledWith(createDto);

      expect(saveMock).toHaveBeenCalledTimes(1);
      expect(saveMock).toHaveBeenCalledWith(episodeEntity);

      expect(result).toEqual({
        id: episodeEntity.id,
        name: episodeEntity.name,
      });
    });
  });
});
