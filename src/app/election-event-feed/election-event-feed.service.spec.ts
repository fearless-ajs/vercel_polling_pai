import { Test, TestingModule } from '@nestjs/testing';
import { ElectionEventFeedService } from './election-event-feed.service';

describe('ElectionEventFeedService', () => {
  let service: ElectionEventFeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectionEventFeedService],
    }).compile();

    service = module.get<ElectionEventFeedService>(ElectionEventFeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
