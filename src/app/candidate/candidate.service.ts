import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import BaseService from "@/helpers/base-service";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import {Candidate, CandidateDocument} from "@app/candidate/entities/candidate.entity";
import {deleteFile} from "@/helpers/file-processor";
import {PartyService} from "@app/party/party.service";
import {ElectionEventService} from "@app/election-event/election-event.service";
import {ElectionEventParty} from "@app/election-event-party/entities/election-event-party.entity";

@Injectable()
export class CandidateService extends BaseService{
  constructor(
      @InjectModel(Candidate.name) private candidateModel: Model<CandidateDocument>,
      private partyService: PartyService,
      private electionEventService: ElectionEventService
  ) {
    super();
  }

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const { name, election_event_id, party_id, image  } =  createCandidateDto

    // Check if the partyId is valid
    if (!mongoose.isValidObjectId(party_id)){
      await deleteFile(image);
      throw new HttpException(`Invalid party id (${party_id})`, HttpStatus.NOT_ACCEPTABLE)
    }

   // Check if the election_event Id is valid
   if (!mongoose.isValidObjectId(election_event_id)){
     await deleteFile(image);
     throw new HttpException(`Invalid election event id (${election_event_id})`, HttpStatus.NOT_ACCEPTABLE)
   }

   // Check if the party exists
    if (!await this.partyService.findOne(party_id)){
      await deleteFile(image);
      throw new HttpException(`Unknown party_id (${party_id})`, HttpStatus.NOT_FOUND)
    }

   // Check if the election_event exists
   if (!await this.electionEventService.findOne(election_event_id)){
     await deleteFile(image);
     throw new HttpException(`Unknown election_event_id (${election_event_id})`, HttpStatus.NOT_FOUND)
   }

    // Check if name exists
    if (await this.candidateModel.findOne({ name, election_event_id, party_id })){
      // Delete logo
      await deleteFile(image);
      throw new HttpException(`Candidate with the name (${name}) exists fot the party`, HttpStatus.CONFLICT)
    }


    return this.candidateModel.create(createCandidateDto)

  }

  async findAll(): Promise<Candidate[]> {
    return this.candidateModel.find();
  }

  async findOne(id: string): Promise<Candidate> {
    // Check if the id is valid
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    return this.candidateModel.findOne({ _id: id });
  }

  async update(id: string, updateCandidateDto: UpdateCandidateDto): Promise<Candidate>{
    const { name, election_event_id, party_id, image  } =  updateCandidateDto;

    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid candidate id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Check if the candidate exists
    const candidate = await this.findOne(id);
    if (!candidate){
      throw new HttpException(`Unknown candidate id (${party_id})`, HttpStatus.NOT_FOUND)
    }

    // Check if the partyId is valid
    if (party_id){
      if (!mongoose.isValidObjectId(party_id)){
        throw new HttpException(`Invalid party id (${party_id})`, HttpStatus.NOT_ACCEPTABLE)
      }

      // Check if the party exists
      if (!await this.partyService.findOne(party_id)){
        throw new HttpException(`Unknown party_id (${party_id})`, HttpStatus.NOT_FOUND)
      }
    }

    // Check if the election_event Id is valid
    if (election_event_id){
      if (!mongoose.isValidObjectId(election_event_id)){
        throw new HttpException(`Invalid election event id (${election_event_id})`, HttpStatus.NOT_ACCEPTABLE)
      }

      // Check if the election_event exists
      if (!await this.electionEventService.findOne(election_event_id)){
        throw new HttpException(`Unknown election_event_id (${election_event_id})`, HttpStatus.NOT_FOUND)
      }
    }

    // FInd candidate with the id

   if (image){
     await deleteFile(image);
   }else {
     updateCandidateDto.image = candidate.image;
   }

    return this.candidateModel.findOneAndUpdate({_id: id}, updateCandidateDto, {
      new: true, //To return the updated version of the document
      runValidators: true // To validate inputs based on the Model schema
    }).exec();
  }

  async remove(id: string) {
    // Check if the id is valid
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid candidate id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Find the election event if i exists
    if (!await this.findOne(id)){
      throw new HttpException(`Unknown candidate (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }
    const candidate = await this.candidateModel.findOne({_id: id});
    await deleteFile(candidate.image);

    return candidate.delete();
  }
}
