import { Module } from '@nestjs/common';
import { ElectionEventService } from './election-event.service';
import { ElectionEventController } from './election-event.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ElectionEvent, ElectionEventSchema} from "@app/election-event/entities/election-event.entity";

@Module({
  controllers: [ElectionEventController],
  providers: [ElectionEventService],
  imports: [
    MongooseModule.forFeature([{ name: ElectionEvent.name, schema: ElectionEventSchema }]),
  ],
  exports: [ElectionEventService]
})
export class ElectionEventModule {}
