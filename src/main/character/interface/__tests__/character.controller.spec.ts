import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from '../character.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

const commandExecuteMock = jest.fn();
const queryExecuteMock = jest.fn();

const CHARACTER_ID = '827b1356-ce96-4db2-a584-182479c36d63';
const EPISODE_ID = 'wet231wt-ce96-4db2-a584-182479c36d63';

describe('CharacterController', () => {
  let characterController: CharacterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
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

    characterController = module.get<CharacterController>(CharacterController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCharacters', () => {
    test('should execute query for list of characters', async () => {
      // Arange
      const pageOptions = { skip: 0, take: 10 };

      // Act
      await characterController.getCharacters(pageOptions);

      // Assert
      expect(queryExecuteMock).toHaveBeenCalledTimes(1);
      expect(queryExecuteMock).toHaveBeenCalledWith({
        pageOptionsDto: pageOptions,
      });
    });
  });

  describe('getCharacterById', () => {
    test('should execute query for certain character', async () => {
      // Act
      await characterController.getCharacterById(CHARACTER_ID);

      // Assert
      expect(queryExecuteMock).toHaveBeenCalledTimes(1);
      expect(queryExecuteMock).toHaveBeenCalledWith({ id: CHARACTER_ID });
    });
  });

  describe('createCharacter', () => {
    test('should execute command to create an character', async () => {
      // Arrange
      const createDto = {
        name: 'Character name',
        planet: 'Planet name',
        episodes: [EPISODE_ID],
      };

      // Act
      await characterController.createCharacter(createDto);

      // Assert
      expect(commandExecuteMock).toHaveBeenCalledTimes(1);
      expect(commandExecuteMock).toHaveBeenCalledWith({ createDto });
    });
  });

  describe('deleteCharacter', () => {
    test('should execute command to delete an character', async () => {
      // Act
      await characterController.deleteCharacter(CHARACTER_ID);

      // Assert
      expect(commandExecuteMock).toHaveBeenCalledTimes(1);
      expect(commandExecuteMock).toHaveBeenCalledWith({ id: CHARACTER_ID });
    });
  });

  describe('updateCharacter', () => {
    test('should execute command to update an character', async () => {
      // Arrange
      const updateDto = { name: 'New name' };

      // Act
      await characterController.updateCharacter(CHARACTER_ID, updateDto);

      // Assert
      expect(commandExecuteMock).toHaveBeenCalledTimes(1);
      expect(commandExecuteMock).toHaveBeenCalledWith({
        id: CHARACTER_ID,
        updateDto,
      });
    });
  });
});
