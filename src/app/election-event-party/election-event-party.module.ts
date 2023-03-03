import { Module } from '@nestjs/common';
import { ElectionEventPartyService } from './election-event-party.service';
import { ElectionEventPartyController } from './election-event-party.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {
  ElectionEventParty,
  ElectionEventPartySchema
} from "@app/election-event-party/entities/election-event-party.entity";
import {PartyModule} from "@app/party/party.module";
import {ElectionEventModule} from "@app/election-event/election-event.module";

@Module({
  controllers: [ElectionEventPartyController],
  providers: [ElectionEventPartyService],
  imports: [
    MongooseModule.forFeature([{ name: ElectionEventParty.name, schema: ElectionEventPartySchema }]),
    PartyModule,
    ElectionEventModule
  ]
})
export class ElectionEventPartyModule {}
