import { Test, TestingModule } from '@nestjs/testing';
import { ElectionEventPartyController } from './election-event-party.controller';
import { ElectionEventPartyService } from './election-event-party.service';

describe('ElectionEventPartyController', () => {
  let controller: ElectionEventPartyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionEventPartyController],
      providers: [ElectionEventPartyService],
    }).compile();

    controller = module.get<ElectionEventPartyController>(ElectionEventPartyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
