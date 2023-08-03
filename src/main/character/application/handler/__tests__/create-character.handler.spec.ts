import { Test, TestingModule } from '@nestjs/testing';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { CreateCharacterHandler } from '../create-character.handler';
import { CharacterMapper } from 'src/main/character/domain/character.mapper';
import { CharacterRepository } from 'src/main/character/infrastructure/character.repository';
import { QueryBus } from '@nestjs/cqrs';

const ID = '827b1356-ce96-4db2-a584-182479c36d63';

const createMock = jest.fn();
const saveMock = jest.fn();
const queryExecuteMock = jest.fn();

describe('CreateCharacterHandler', () => {
  let handler: CreateCharacterHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        CreateCharacterHandler,
        CharacterMapper,
        {
          provide: CharacterRepository,
          useValue: {
            create: createMock,
            save: saveMock,
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: queryExecuteMock,
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

    handler = module.get<CreateCharacterHandler>(CreateCharacterHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should execute the command and create an episode', async () => {
      // Arrange
      const createDto = {
        name: 'Character name',
        planet: 'Planet name',
        episodes: [ID],
      };

      const episodeEntity = { id: ID, name: 'Episode name', version: 1 };

      const characterEntity = {
        id: ID,
        name: 'Character name',
        planet: 'Planet name',
        episodes: [episodeEntity],
      };

      createMock.mockReturnValueOnce(characterEntity);
      queryExecuteMock.mockReturnValueOnce([episodeEntity]);

      // Act
      const result = await handler.execute({ createDto });

      // Assert
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(createMock).toHaveBeenCalledWith({
        ...createDto,
        episodes: [episodeEntity],
      });

      expect(saveMock).toHaveBeenCalledTimes(1);
      expect(saveMock).toHaveBeenCalledWith(characterEntity);

      expect(result).toEqual({
        name: characterEntity.name,
        planet: characterEntity.planet,
        episodes: [episodeEntity.name],
      });
    });
  });
});
