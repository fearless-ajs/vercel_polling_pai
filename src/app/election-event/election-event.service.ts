import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateElectionEventDto } from './dto/create-election-event.dto';
import { UpdateElectionEventDto } from './dto/update-election-event.dto';
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import BaseService from "@/helpers/base-service";
import {ElectionEvent, ElectionEventDocument} from "@app/election-event/entities/election-event.entity";
import {Request} from "express";

@Injectable()
export class ElectionEventService extends BaseService{
  constructor(@InjectModel(ElectionEvent.name) private electionEventModel: Model<ElectionEventDocument>) {
    super();
  }

  async create(createElectionEventDto: CreateElectionEventDto): Promise<ElectionEvent> {
    return this.electionEventModel.create(createElectionEventDto);
  }


  async findAll(req: Request): Promise<ElectionEvent[]> {
    return this.getAllData(this.electionEventModel, req);
  }

  async findOne(id: string): Promise<ElectionEvent> {
   // Check if the id is valid
   if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid election event id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    return this.electionEventModel.findOne({ _id: id });
  }

  async update(id: string, updateElectionEventDto: UpdateElectionEventDto): Promise<ElectionEvent> {
    // Check if the id is valid
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid election event id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Fin the election event if i exists
    if (!await this.findOne(id)){
      throw new HttpException(`Unknown election event id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    return this.electionEventModel.findOneAndUpdate({_id: id}, updateElectionEventDto, {
      new: true, //To return the updated version of the document
      runValidators: true // To validate inputs based on the Model schema
    }).exec();
  }

  async remove(id: string): Promise<ElectionEvent> {
    // Check if the id is valid
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid election event id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Find the election event if i exists
    if (!await this.findOne(id)){
      throw new HttpException(`Unknown election event id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }
    return this.electionEventModel.findOneAndDelete({ _id: id });
  }
}
