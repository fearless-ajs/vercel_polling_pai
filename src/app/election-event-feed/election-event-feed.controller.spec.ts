import { Test, TestingModule } from '@nestjs/testing';
import { ElectionEventFeedController } from './election-event-feed.controller';
import { ElectionEventFeedService } from './election-event-feed.service';

describe('ElectionEventFeedController', () => {
  let controller: ElectionEventFeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionEventFeedController],
      providers: [ElectionEventFeedService],
    }).compile();

    controller = module.get<ElectionEventFeedController>(ElectionEventFeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
