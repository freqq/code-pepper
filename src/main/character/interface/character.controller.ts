import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorators/paginated-response.decorator';
import { CharacterDto } from './dto/character.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCharacterQuery } from '../application/query/get-character.query';
import { CreateCharacterCommand } from '../application/command/create-character.command';
import { DeleteCharacterCommand } from '../application/command/delete-character.command';
import { UpdateCharacterCommand } from '../application/command/update-character.command';
import { GetCharactersQuery } from '../application/query/get-characters.query';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Character')
@Controller('/character')
@UseInterceptors(ClassSerializerInterceptor)
export class CharacterController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(CharacterDto)
  @ApiBadRequestResponse({ description: 'Failed to fetch list of characters' })
  @UseInterceptors(CacheInterceptor)
  getCharacters(@Query() pageOptions: PageOptionsDto) {
    return this.queryBus.execute(new GetCharactersQuery(pageOptions));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CharacterDto })
  @ApiBadRequestResponse({ description: 'Failed to fetch a character' })
  @UseInterceptors(CacheInterceptor)
  getCharacterById(@Param('id') id: string) {
    return this.queryBus.execute(new GetCharacterQuery(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Character created', type: CharacterDto })
  @ApiBadRequestResponse({ description: 'Failed to create character' })
  createCharacter(@Body() createDto: CreateCharacterDto) {
    return this.commandBus.execute(new CreateCharacterCommand(createDto));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: 'Character has been successfully deleted' })
  @ApiBadRequestResponse({ description: 'Failed to delete character' })
  deleteCharacter(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteCharacterCommand(id));
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: 'Character has been successfully updated' })
  @ApiBadRequestResponse({ description: 'Failed to update character' })
  updateCharacter(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateCharacterDto>,
  ) {
    return this.commandBus.execute(new UpdateCharacterCommand(id, updateDto));
  }
}
