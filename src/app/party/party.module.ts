import { Module } from '@nestjs/common';
import { PartyService } from './party.service';
import { PartyController } from './party.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Party, PartySchema} from "@app/party/entities/party.entity";

@Module({
  controllers: [PartyController],
  providers: [PartyService],
  imports: [
    MongooseModule.forFeature([{ name: Party.name, schema: PartySchema }]),
  ],
  exports: [PartyService]
})
export class PartyModule {}
