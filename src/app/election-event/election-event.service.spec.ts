import { Test, TestingModule } from '@nestjs/testing';
import { ElectionEventService } from './election-event.service';

describe('ElectionEventService', () => {
  let service: ElectionEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectionEventService],
    }).compile();

    service = module.get<ElectionEventService>(ElectionEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
