import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateElectionEventFeedDto } from './dto/create-election-event-feed.dto';
import { UpdateElectionEventFeedDto } from './dto/update-election-event-feed.dto';
import BaseService from "@/helpers/base-service";
import {InjectModel} from "@nestjs/mongoose";
import {Candidate, CandidateDocument} from "@app/candidate/entities/candidate.entity";
import mongoose, {Model} from "mongoose";
import {UserService} from "@app/user/user.service";
import {StateService} from "@app/poll/state/state.service";
import {LgaService} from "@app/poll/lga/lga.service";
import {UnitService} from "@app/poll/unit/unit.service";
import {ElectionEventService} from "@app/election-event/election-event.service";
import {deleteFile} from "@/helpers/file-processor";
import {
  ElectionEventFeed,
  ElectionEventFeedDocument
} from "@app/election-event-feed/entities/election-event-feed.entity";

@Injectable()
export class ElectionEventFeedService extends BaseService{
  constructor(
      @InjectModel(ElectionEventFeed.name) private electionEventFeedModel: Model<ElectionEventFeedDocument>,
      private userService: UserService,
      private electionEventService: ElectionEventService,
      private stateService: StateService,
      private lgaService: LgaService,
      private unitService: UnitService
  ) {
    super();
  }

  async create(createElectionEventFeedDto: CreateElectionEventFeedDto): Promise<ElectionEventFeed> {
    const { election_event_id, state_id, lga_id, unit_id, user_id, image } = createElectionEventFeedDto;

    // Check if the election event Id is valid
    if (!mongoose.isValidObjectId(election_event_id)){
      await deleteFile(image);
      throw new HttpException(`Invalid election_event_id (${election_event_id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Check if the election state Id is valid
    if (!mongoose.isValidObjectId(state_id)){
      await deleteFile(image);
      throw new HttpException(`Invalid state_id (${state_id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Check if the lga id is valid
    if (!mongoose.isValidObjectId(lga_id)){
      await deleteFile(image);
      throw new HttpException(`Invalid election_even_id (${lga_id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Check if the unit Id is valid
    if (!mongoose.isValidObjectId(election_event_id)){
      await deleteFile(image);
      throw new HttpException(`Invalid unit_id (${unit_id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Check if the election event Id is valid
    if (!mongoose.isValidObjectId(user_id)){
      await deleteFile(image);
      throw new HttpException(`Invalid user_id (${election_event_id})`, HttpStatus.NOT_ACCEPTABLE)
    }


    return this.electionEventFeedModel.create(createElectionEventFeedDto);
  }

  async findAll(): Promise<ElectionEventFeed[]> {
    return this.electionEventFeedModel.find();
  }

  async findOne(id: string): Promise<ElectionEventFeed> {
    // Check if the id is valid
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    return this.electionEventFeedModel.findOne({ _id: id });
  }


 async update(id: string, updateElectionEventFeedDto: UpdateElectionEventFeedDto): Promise<ElectionEventFeed> {
   const { election_event_id, state_id, lga_id, unit_id, user_id, image } = updateElectionEventFeedDto;

   // Check if the Id is valid
   if (!mongoose.isValidObjectId(id)){
     await deleteFile(image);
     throw new HttpException(`Invalid id (${id})`, HttpStatus.NOT_ACCEPTABLE)
   }

   // Check if the event feed exists
   const feed = await this.findOne(id);
   if (!feed){
     throw new HttpException(`Unknown event_feed id (${id})`, HttpStatus.NOT_FOUND)
   }

   if (election_event_id){
     // Check if the election event Id is valid
     if (!mongoose.isValidObjectId(election_event_id)){
       await deleteFile(image);
       throw new HttpException(`Invalid election_event_id (${election_event_id})`, HttpStatus.NOT_ACCEPTABLE)
     }
   }

   if (state_id){
     // Check if the election state Id is valid
     if (!mongoose.isValidObjectId(state_id)){
       await deleteFile(image);
       throw new HttpException(`Invalid state_id (${state_id})`, HttpStatus.NOT_ACCEPTABLE)
     }
   }

   if (lga_id){
     // Check if the lga id is valid
     if (!mongoose.isValidObjectId(lga_id)){
       await deleteFile(image);
       throw new HttpException(`Invalid election_even_id (${lga_id})`, HttpStatus.NOT_ACCEPTABLE)
     }
   }

   if (unit_id){
     // Check if the unit Id is valid
     if (!mongoose.isValidObjectId(unit_id)){
       await deleteFile(image);
       throw new HttpException(`Invalid unit_id (${unit_id})`, HttpStatus.NOT_ACCEPTABLE)
     }
   }

   if (user_id){
     // Check if the election event Id is valid
     if (!mongoose.isValidObjectId(user_id)){
       await deleteFile(image);
       throw new HttpException(`Invalid user_id (${election_event_id})`, HttpStatus.NOT_ACCEPTABLE)
     }
   }


   if (image){
     await deleteFile(image);
   }else {
     updateElectionEventFeedDto.image = feed.image;
   }


   return this.electionEventFeedModel.findOneAndUpdate({_id: id}, updateElectionEventFeedDto, {
     new: true, //To return the updated version of the document
     runValidators: true // To validate inputs based on the Model schema
   }).exec();

  }

  async remove(id: string) {
    // Check if the id is valid
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }


    const feed = await this.electionEventFeedModel.findById(id);
    // Find the election event if i exists
    if (!feed){
      throw new HttpException(`Unknown feed (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }
    await deleteFile(feed.image);

    return feed.delete();
  }
}
