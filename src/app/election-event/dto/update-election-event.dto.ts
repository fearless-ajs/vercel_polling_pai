import { PartialType } from '@nestjs/mapped-types';
import { CreateElectionEventDto } from './create-election-event.dto';

export class UpdateElectionEventDto extends PartialType(CreateElectionEventDto) {}
