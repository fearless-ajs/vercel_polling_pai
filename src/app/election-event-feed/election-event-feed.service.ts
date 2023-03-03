import { Injectable } from '@nestjs/common';
import { CreateElectionEventFeedDto } from './dto/create-election-event-feed.dto';
import { UpdateElectionEventFeedDto } from './dto/update-election-event-feed.dto';

@Injectable()
export class ElectionEventFeedService {
  create(createElectionEventFeedDto: CreateElectionEventFeedDto) {
    return 'This action adds a new electionEventFeed';
  }

  findAll() {
    return `This action returns all electionEventFeed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} electionEventFeed`;
  }

  update(id: number, updateElectionEventFeedDto: UpdateElectionEventFeedDto) {
    return `This action updates a #${id} electionEventFeed`;
  }

  remove(id: number) {
    return `This action removes a #${id} electionEventFeed`;
  }
}
