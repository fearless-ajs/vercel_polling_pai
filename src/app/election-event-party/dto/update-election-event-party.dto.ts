import { PartialType } from '@nestjs/mapped-types';
import { CreateElectionEventPartyDto } from './create-election-event-party.dto';

export class UpdateElectionEventPartyDto extends PartialType(CreateElectionEventPartyDto) {}
