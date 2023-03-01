import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import {Model} from "mongoose";
import {State, StateDocument} from "./entities/state.entity";
import {InjectModel} from "@nestjs/mongoose";
import BaseService from "@/helpers/base-service";
import {Request} from "express";

@Injectable()
export class StateService extends BaseService{
  constructor(@InjectModel(State.name) private stateModel: Model<StateDocument>) {
      super();
  }


  async create(createStateDto: CreateStateDto): Promise<State> {
    // Check if the name exists
    if (await this.stateModel.findOne({ name: createStateDto.name }).exec()){
      throw new HttpException(`State with the name (${createStateDto.name}) exists`, HttpStatus.CONFLICT)
    }

    return this.stateModel.create(createStateDto);
  }

  async findAll(req: Request): Promise<State[]> {
      return this.getAllData(this.stateModel, req);
  }

  async findOne(id: string): Promise<State> {
    return this.stateModel.findOne({ id: id });
  }

 async update(id: string, updateStateDto: UpdateStateDto): Promise<State> {
    // Check if the name exists
    if (await this.stateModel.findOne({ name: updateStateDto.name, id: { $ne: id} }).exec()){
      throw new HttpException(`State with the name (${updateStateDto.name}) exists`, HttpStatus.CONFLICT)
    }
   return this.stateModel.findOneAndUpdate({id: id}, updateStateDto, {
     new: true, //To return the updated version of the document
     runValidators: true // To validate inputs based on the Model schema
   }).exec();
  }

  async remove(id: string): Promise<State> {
    return this.stateModel.findOneAndDelete({ id: id });
  }
}
