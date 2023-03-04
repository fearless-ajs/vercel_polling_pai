import { Module } from '@nestjs/common';
import { ElectionEventFeedService } from './election-event-feed.service';
import { ElectionEventFeedController } from './election-event-feed.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ElectionEventModule} from "@app/election-event/election-event.module";
import {ElectionEventFeed, ElectionEVentFeedSchema} from "@app/election-event-feed/entities/election-event-feed.entity";
import {UserModule} from "@app/user/user.module";
import {StateModule} from "@app/poll/state/state.module";
import {LgaModule} from "@app/poll/lga/lga.module";
import {UnitModule} from "@app/poll/unit/unit.module";

@Module({
  controllers: [ElectionEventFeedController],
  providers: [ElectionEventFeedService],
  imports: [
    MongooseModule.forFeature([{ name: ElectionEventFeed.name, schema: ElectionEVentFeedSchema }]),
    UserModule,
    StateModule,
    LgaModule,
    UnitModule,
    ElectionEventModule,
  ]
})
export class ElectionEventFeedModule {}
