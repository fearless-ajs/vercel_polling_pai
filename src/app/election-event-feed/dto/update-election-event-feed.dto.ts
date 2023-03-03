import { PartialType } from '@nestjs/mapped-types';
import { CreateElectionEventFeedDto } from './create-election-event-feed.dto';

export class UpdateElectionEventFeedDto extends PartialType(CreateElectionEventFeedDto) {}
