import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateLgaDto } from './dto/create-lga.dto';
import { UpdateLgaDto } from './dto/update-lga.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Lga, LgaDocument} from "@app/poll/lga/entities/lga.entity";
import BaseService from "@/helpers/base-service";
import {Request} from "express";

@Injectable()
export class LgaService extends  BaseService{
  constructor(@InjectModel(Lga.name) private lgaModel: Model<LgaDocument>) {
    super();
  }


  async create(createLgaDto: CreateLgaDto):Promise<Lga> {
    // Check if the name exists
    if (await this.lgaModel.findOne({ name: createLgaDto.name, state_id: createLgaDto.state_id }).exec()){
      throw new HttpException(`Lga with the name (${createLgaDto.name}) exists`, HttpStatus.CONFLICT)
    }

    return this.lgaModel.create(createLgaDto);
  }

  async findAll(req: Request): Promise<Lga[]> {
    return this.getAllData(this.lgaModel, req);
  }

  async findOne(id: string): Promise<Lga> {
    return this.lgaModel.findOne({ id: id });
  }

  async update(id: string, updateLgaDto: UpdateLgaDto): Promise<Lga> {
    // Check if the name exists
    if (await this.lgaModel.findOne({ name: updateLgaDto.name, state_id: updateLgaDto.state_id, id: { $ne: id} }).exec()){
      throw new HttpException(`Lga with the name (${updateLgaDto.name}) exists`, HttpStatus.CONFLICT)
    }
    return this.lgaModel.findOneAndUpdate({id: id}, updateLgaDto, {
      new: true, //To return the updated version of the document
      runValidators: true // To validate inputs based on the Model schema
    }).exec();
  }

  async remove(id: string) : Promise<Lga> {
    return this.lgaModel.findOneAndDelete({ id: id });
  }
}
