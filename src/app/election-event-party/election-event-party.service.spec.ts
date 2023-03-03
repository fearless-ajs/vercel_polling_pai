import { Test, TestingModule } from '@nestjs/testing';
import { ElectionEventPartyService } from './election-event-party.service';

describe('ElectionEventPartyService', () => {
  let service: ElectionEventPartyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectionEventPartyService],
    }).compile();

    service = module.get<ElectionEventPartyService>(ElectionEventPartyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
