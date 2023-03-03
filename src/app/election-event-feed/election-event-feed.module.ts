import { Module } from '@nestjs/common';
import { ElectionEventFeedService } from './election-event-feed.service';
import { ElectionEventFeedController } from './election-event-feed.controller';

@Module({
  controllers: [ElectionEventFeedController],
  providers: [ElectionEventFeedService]
})
export class ElectionEventFeedModule {}
