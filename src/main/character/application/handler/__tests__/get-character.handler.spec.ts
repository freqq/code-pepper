import { Test, TestingModule } from '@nestjs/testing';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { GetCharacterHandler } from '../get-character.handler';
import { CharacterRepository } from 'src/main/character/infrastructure/character.repository';
import { CharacterMapper } from 'src/main/character/domain/character.mapper';
import { CharacterNotFound } from 'src/common/exceptions/character-not-found.exception';

const ID = '827b1356-ce96-4db2-a584-182479c36d63';

const findByIdMock = jest.fn();

describe('GetCharacterHandler', () => {
  let handler: GetCharacterHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        GetCharacterHandler,
        CharacterMapper,
        {
          provide: CharacterRepository,
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

    handler = module.get<GetCharacterHandler>(GetCharacterHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should execute the query and return the character', async () => {
      // Arrange
      const characterEntity = {
        id: ID,
        name: 'Character name',
        version: 1,
        planet: 'Planet name',
        episodes: [],
      };

      findByIdMock.mockReturnValueOnce([characterEntity]);

      // Act
      const result = await handler.execute({ id: ID });

      // Assert
      expect(findByIdMock).toHaveBeenCalledTimes(1);
      expect(findByIdMock).toHaveBeenCalledWith(ID);

      expect(result).toEqual({
        name: characterEntity.name,
        planet: characterEntity.planet,
        episodes: [],
      });
    });

    test('should execute the query and throw an exception if character does not exist', async () => {
      // Arrange
      const id = '827b1356-ce96-4db2-a584-182479c36d63';
      findByIdMock.mockReturnValueOnce([]);

      // Act and assert
      await expect(handler.execute({ id })).rejects.toThrow(CharacterNotFound);
    });
  });
});
