import { CreateEpisodeHandler } from './create-episode.handler';
import { DeleteEpisodeHandler } from './delete-episode.handler';
import { GetEpisodeHandler } from './get-episode.handler';
import { GetEpisodesByIdsHandler } from './get-episodes-by-ids.handler';
import { GetEpisodesHandler } from './get-episodes.handler';
import { UpdateEpisodeHandler } from './update-episode.handler';

export const Handlers = [
  CreateEpisodeHandler,
  DeleteEpisodeHandler,
  GetEpisodeHandler,
  GetEpisodesHandler,
  UpdateEpisodeHandler,
  GetEpisodesByIdsHandler,
];
