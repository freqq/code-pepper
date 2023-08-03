import { Test, TestingModule } from '@nestjs/testing';
import { AutomapperModule, getMapperToken } from '@automapper/nestjs';
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { GetCharactersHandler } from '../get-characters.handler';
import { CharacterMapper } from 'src/main/character/domain/character.mapper';
import { CharacterRepository } from 'src/main/character/infrastructure/character.repository';

const findMock = jest.fn();

describe('GetCharactersHandler', () => {
  let handler: GetCharactersHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AutomapperModule],
      providers: [
        GetCharactersHandler,
        CharacterMapper,
        {
          provide: CharacterRepository,
          useValue: {
            find: findMock,
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

    handler = module.get<GetCharactersHandler>(GetCharactersHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    test('should execute the query and return list of episodes', async () => {
      // Arrange
      const ID = '827b1356-ce96-4db2-a584-182479c36d63';
      const episodeEntities = [{ id: ID, name: 'Episode name', version: 1 }];

      const characterEntities = [
        {
          id: ID,
          name: 'Character name',
          planet: 'Planet name',
          episodes: episodeEntities,
          version: 2,
        },
      ];

      const paginationDto = {
        hasNextPage: false,
        hasPreviousPage: false,
        itemCount: 5,
        page: undefined,
        pageCount: 1,
        take: 10,
      };

      findMock.mockReturnValueOnce([characterEntities, 5]);

      // Act
      const result = await handler.execute({
        pageOptionsDto: { skip: 0, take: 10 },
      });

      // Assert
      expect(findMock).toHaveBeenCalledTimes(1);
      expect(findMock).toHaveBeenCalledWith(0, 10);

      expect(result).toEqual({
        data: characterEntities.map(({ version, id, episodes, ...rest }) => ({
          ...rest,
          episodes: episodes.map(({ name }) => name),
        })),
        meta: paginationDto,
      });
    });
  });
});
