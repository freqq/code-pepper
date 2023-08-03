import { Test, TestingModule } from '@nestjs/testing';
import { CharacterRepository } from '../character.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CharacterEntity } from '../character.entity';
import { CreateCharacterEntityDto } from '../../interface/dto/create-character-entity.dto';

const ID = '827b1356-ce96-4db2-a584-182479c36d63';
const SKIP = 0;
const TAKE = 10;

const EPISODE_ENTITY = {
  id: ID,
  name: 'Episode name',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  version: 1,
  characters: [],
};

const CHARACTER_ENTITY = {
  id: ID,
  name: 'Character name',
  planet: 'Planet name',
  episodes: [EPISODE_ENTITY],
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  version: 1,
};

const findMock = jest.fn();
const createMock = jest.fn();
const saveMock = jest.fn();
const existMock = jest.fn();
const findAndCountMock = jest.fn();
const updateMock = jest.fn();
const deleteMock = jest.fn();

describe('CharacterRepository', () => {
  let repository: CharacterRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterRepository,
        {
          provide: getRepositoryToken(CharacterEntity),
          useValue: {
            find: findMock,
            create: createMock,
            save: saveMock,
            exist: existMock,
            findAndCount: findAndCountMock,
            update: updateMock,
            delete: deleteMock,
          },
        },
      ],
    }).compile();

    repository = module.get<CharacterRepository>(CharacterRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    test('should return found character by id', async () => {
      // Arrange
      findMock.mockReturnValueOnce([CHARACTER_ENTITY]);

      // Act
      const result = await repository.findById(ID);

      // Assert
      expect(findMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual([CHARACTER_ENTITY]);
    });
  });

  describe('create', () => {
    test('should create an entity out of dto', async () => {
      // Arrange
      const createDto: CreateCharacterEntityDto = {
        name: 'Character name',
        episodes: [],
      };
      createMock.mockReturnValueOnce(CHARACTER_ENTITY);

      // Act
      const result = repository.create(createDto);

      // Assert
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(CHARACTER_ENTITY);
    });
  });

  describe('exists', () => {
    test('should return true if entity exists', async () => {
      // Arrange
      existMock.mockReturnValueOnce(true);

      // Act
      const result = await repository.exists(ID);

      // Assert
      expect(existMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(true);
    });

    test('should return false if entity does not exist', async () => {
      // Arrange
      existMock.mockReturnValueOnce(false);

      // Act
      const result = await repository.exists(ID);

      // Assert
      expect(existMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(false);
    });
  });

  describe('save', () => {
    test('should save entity', async () => {
      // Arrange
      saveMock.mockReturnValueOnce(CHARACTER_ENTITY);

      // Act
      const result = await repository.save(CHARACTER_ENTITY);

      // Assert
      expect(saveMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(CHARACTER_ENTITY);
    });
  });

  describe('find', () => {
    test('should return list of characters with total count', async () => {
      // Arrange
      findAndCountMock.mockReturnValueOnce([CHARACTER_ENTITY, 1]);

      // Act
      const result = await repository.find(SKIP, TAKE);

      // Assert
      expect(findAndCountMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual([CHARACTER_ENTITY, 1]);
    });
  });

  describe('update', () => {
    test('should update an entity', async () => {
      // Arrange
      updateMock.mockReturnValueOnce({ generatedMaps: [] });

      // Act
      const result = await repository.update(ID, CHARACTER_ENTITY);

      // Assert
      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ generatedMaps: [] });
    });
  });

  describe('deleteById', () => {
    test('should delete an entity based on id', async () => {
      // Arrange
      deleteMock.mockReturnValueOnce({ affected: 1 });

      // Act
      const result = await repository.deleteById(ID);

      // Assert
      expect(deleteMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ affected: 1 });
    });
  });
});
