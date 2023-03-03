import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import {PartyModule} from "@app/party/party.module";
import {ElectionEventModule} from "@app/election-event/election-event.module";
import {MongooseModule} from "@nestjs/mongoose";
import {Candidate, CandidateSchema} from "@app/candidate/entities/candidate.entity";

@Module({
  controllers: [CandidateController],
  providers: [CandidateService],
  imports: [
    MongooseModule.forFeature([{ name: Candidate.name, schema: CandidateSchema }]),
    PartyModule,
    ElectionEventModule,
  ]
})
export class CandidateModule {}
