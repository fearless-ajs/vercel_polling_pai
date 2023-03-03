import { Test, TestingModule } from '@nestjs/testing';
import { ElectionEventController } from './election-event.controller';
import { ElectionEventService } from './election-event.service';

describe('ElectionEventController', () => {
  let controller: ElectionEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectionEventController],
      providers: [ElectionEventService],
    }).compile();

    controller = module.get<ElectionEventController>(ElectionEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
