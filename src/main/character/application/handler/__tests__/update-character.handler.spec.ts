import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCharacterHandler } from '../update-character.handler';
import { CharacterRepository } from 'src/main/character/infrastructure/character.repository';
import { CharacterNotFound } from 'src/common/exceptions/character-not-found.exception';
import { QueryBus } from '@nestjs/cqrs';

const ID = '827b1356-ce96-4db2-a584-182479c36d63';
const episodeEntity = { id: ID, name: 'Episode name', version: 1 };
const updateDto = { name: 'Character name', episodes: [ID] };

const characterEntity = {
  id: ID,
  name: 'Character name',
  planet: 'Planet name',
  episodes: [episodeEntity],
};

const findByIdMock = jest.fn();
const saveMock = jest.fn();
const queryExecuteMock = jest.fn();

describe('UpdateCharacterHandler', () => {
  let handler: UpdateCharacterHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCharacterHandler,
        {
          provide: CharacterRepository,
          useValue: {
            findById: findByIdMock,
            save: saveMock,
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

    handler = module.get<UpdateCharacterHandler>(UpdateCharacterHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should execute the command and update the character', async () => {
      // Arrange

      findByIdMock.mockReturnValueOnce([characterEntity]);
      queryExecuteMock.mockReturnValueOnce([episodeEntity]);

      // Act
      await handler.execute({
        id: ID,
        updateDto,
      });

      // Assert
      expect(findByIdMock).toHaveBeenCalledTimes(1);
      expect(saveMock).toHaveBeenCalledTimes(1);
      expect(saveMock).toHaveBeenCalledWith(characterEntity);
    });

    test('should execute the command and throw an exception if character does not exist', async () => {
      // Arrange
      findByIdMock.mockReturnValueOnce([]);

      // Act and assert
      await expect(handler.execute({ id: ID, updateDto })).rejects.toThrow(
        CharacterNotFound,
      );
    });
  });
});
