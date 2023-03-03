import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateElectionEventPartyDto } from './dto/create-election-event-party.dto';
import { UpdateElectionEventPartyDto } from './dto/update-election-event-party.dto';
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import BaseService from "@/helpers/base-service";
import {ElectionEventParty} from "@app/election-event-party/entities/election-event-party.entity";
import {PartyService} from "@app/party/party.service";
import {ElectionEventService} from "@app/election-event/election-event.service";

@Injectable()
export class ElectionEventPartyService extends BaseService{
  constructor(
      @InjectModel(ElectionEventParty.name) private electionEventPartyModel: Model<ElectionEventParty>,
      private partyService: PartyService,
      private electionEventService: ElectionEventService
  ) {
    super();
  }

 async create(createElectionEventPartyDto: CreateElectionEventPartyDto): Promise<ElectionEventParty> {
    const { party_id, election_event_id } = createElectionEventPartyDto;
    // Check if the partyId is valid
    if (!mongoose.isValidObjectId(party_id)){
      throw new HttpException(`Invalid party id (${party_id})`, HttpStatus.NOT_ACCEPTABLE)
    }

   // Check if the election_event Id is valid
   if (!mongoose.isValidObjectId(election_event_id)){
     throw new HttpException(`Invalid election event id (${election_event_id})`, HttpStatus.NOT_ACCEPTABLE)
   }

   // Check if the party exists
    if (!await this.partyService.findOne(party_id)){
      throw new HttpException(`Unknown party_id (${party_id})`, HttpStatus.NOT_FOUND)
    }

   // Check if the election_event exists
   if (!await this.electionEventService.findOne(election_event_id)){
     throw new HttpException(`Unknown election_event_id (${election_event_id})`, HttpStatus.NOT_FOUND)
   }

   // Check f the party is already registered
   if (await this.electionEventPartyModel.findOne({  party_id, election_event_id  })){
     throw new HttpException(`Party already registered for the event`, HttpStatus.CONFLICT)
   }

    return this.electionEventPartyModel.create(createElectionEventPartyDto);
  }

  async findAll(): Promise<ElectionEventParty[]> {
    return this.electionEventPartyModel.find();
  }

  async findOne(id: string): Promise<ElectionEventParty> {
    // Check if the id is valid
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }
    return this.electionEventPartyModel.findOne({ _id: id });
  }

  async remove(id: string): Promise<ElectionEventParty> {
    // Check if the id is valid
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Check f the party is already registered
    if (!await this.findOne(id)){
      throw new HttpException(`Details with the ID(${id}) not found`, HttpStatus.CONFLICT)
    }

    return this.electionEventPartyModel.findByIdAndDelete(id);
  }
}
