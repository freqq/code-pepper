import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EpisodeRepository } from '../episode.repository';
import { EpisodeEntity } from '../episode.entity';
import { CreateEpisodeDto } from '../../interface/dto/create-episode.dto';

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

const findOneByMock = jest.fn();
const createMock = jest.fn();
const saveMock = jest.fn();
const existMock = jest.fn();
const findAndCountMock = jest.fn();
const updateMock = jest.fn();
const deleteMock = jest.fn();
const findMock = jest.fn();

describe('EpisodeRepository', () => {
  let repository: EpisodeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodeRepository,
        {
          provide: getRepositoryToken(EpisodeEntity),
          useValue: {
            findOneBy: findOneByMock,
            create: createMock,
            save: saveMock,
            exist: existMock,
            findAndCount: findAndCountMock,
            update: updateMock,
            delete: deleteMock,
            find: findMock,
          },
        },
      ],
    }).compile();

    repository = module.get<EpisodeRepository>(EpisodeRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    test('should return found episode by id', async () => {
      // Arrange
      findOneByMock.mockReturnValueOnce(EPISODE_ENTITY);

      // Act
      const result = await repository.findById(ID);

      // Assert
      expect(findOneByMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(EPISODE_ENTITY);
    });
  });

  describe('create', () => {
    test('should create an entity out of dto', async () => {
      // Arrange
      const createDto: CreateEpisodeDto = {
        name: 'Episode name',
      };
      createMock.mockReturnValueOnce(EPISODE_ENTITY);

      // Act
      const result = repository.create(createDto);

      // Assert
      expect(createMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(EPISODE_ENTITY);
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
      saveMock.mockReturnValueOnce(EPISODE_ENTITY);

      // Act
      const result = await repository.save(EPISODE_ENTITY);

      // Assert
      expect(saveMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual(EPISODE_ENTITY);
    });
  });

  describe('find', () => {
    test('should return list of episodes with total count', async () => {
      // Arrange
      findAndCountMock.mockReturnValueOnce([EPISODE_ENTITY, 1]);

      // Act
      const result = await repository.find(SKIP, TAKE);

      // Assert
      expect(findAndCountMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual([EPISODE_ENTITY, 1]);
    });
  });

  describe('update', () => {
    test('should update an entity', async () => {
      // Arrange
      updateMock.mockReturnValueOnce({ generatedMaps: [] });

      // Act
      const result = await repository.update(ID, EPISODE_ENTITY);

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

  describe('findManyByIds', () => {
    test('should return list of entities based on ids', async () => {
      // Arrange
      findMock.mockReturnValueOnce([EPISODE_ENTITY]);

      // Act
      const result = await repository.findManyByIds([ID]);

      // Assert
      expect(findMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual([EPISODE_ENTITY]);
    });
  });
});
