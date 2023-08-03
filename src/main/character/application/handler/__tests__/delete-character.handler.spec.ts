import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from 'src/common/logger/logger.service';
import { DeleteCharacterHandler } from '../delete-character.handler';
import { CharacterRepository } from 'src/main/character/infrastructure/character.repository';
import { CharacterNotFound } from 'src/common/exceptions/character-not-found.exception';

const deleteByIdMock = jest.fn();
const existsMock = jest.fn();
const logMock = jest.fn();

describe('DeleteCharacterHandler', () => {
  let handler: DeleteCharacterHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: LoggerService,
          useValue: { log: logMock },
        },
        DeleteCharacterHandler,
        {
          provide: CharacterRepository,
          useValue: {
            exists: existsMock,
            deleteById: deleteByIdMock,
          },
        },
      ],
    }).compile();

    handler = module.get<DeleteCharacterHandler>(DeleteCharacterHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should execute the command and delete the character', async () => {
      // Arrange
      const id = '827b1356-ce96-4db2-a584-182479c36d63';
      existsMock.mockReturnValueOnce(true);

      // Act
      await handler.execute({ id });

      // Assert
      expect(existsMock).toHaveBeenCalledTimes(1);
      expect(existsMock).toHaveBeenCalledWith(id);

      expect(deleteByIdMock).toHaveBeenCalledTimes(1);
      expect(deleteByIdMock).toHaveBeenCalledWith(id);
    });

    test('should execute the command and throw an exception if character does not exist', async () => {
      // Arrange
      const id = '827b1356-ce96-4db2-a584-182479c36d63';
      existsMock.mockReturnValueOnce(false);

      // Act and assert
      await expect(handler.execute({ id })).rejects.toThrow(CharacterNotFound);
    });
  });
});
