import {
  Body,
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
import { EpisodeDto } from './dto/episode.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetEpisodesQuery } from '../application/query/get-episodes.query';
import { GetEpisodeQuery } from '../application/query/get-episode.query';
import { CreateEpisodeCommand } from '../application/command/create-episode.command';
import { DeleteEpisodeCommand } from '../application/command/delete-episode.command';
import { UpdateEpisodeCommand } from '../application/command/update-episode.command';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Episode')
@Controller('/episode')
export class EpisodeController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(EpisodeDto)
  @ApiBadRequestResponse({ description: 'Failed to fetch list of episodes' })
  @UseInterceptors(CacheInterceptor)
  getEpisodes(@Query() pageOptions: PageOptionsDto) {
    return this.queryBus.execute(new GetEpisodesQuery(pageOptions));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: EpisodeDto })
  @ApiBadRequestResponse({ description: 'Failed to fetch an episode' })
  @UseInterceptors(CacheInterceptor)
  getEpisodeById(@Param('id') id: string) {
    return this.queryBus.execute(new GetEpisodeQuery(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Episode created', type: EpisodeDto })
  @ApiBadRequestResponse({ description: 'Failed to create episode' })
  createEpisode(@Body() createDto: CreateEpisodeDto) {
    return this.commandBus.execute(new CreateEpisodeCommand(createDto));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: 'Episode has been successfully deleted' })
  @ApiBadRequestResponse({ description: 'Failed to delete episode' })
  deleteEpisode(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteEpisodeCommand(id));
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: 'Episode has been successfully updated' })
  @ApiBadRequestResponse({ description: 'Failed to update episode' })
  updateEpisode(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateEpisodeDto>,
  ) {
    return this.commandBus.execute(new UpdateEpisodeCommand(id, updateDto));
  }
}
