import { IQuery } from '@nestjs/cqrs';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

export class GetEpisodesQuery implements IQuery {
  constructor(readonly pageOptionsDto: PageOptionsDto) {}
}
