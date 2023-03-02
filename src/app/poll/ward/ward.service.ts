import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import BaseService from "@/helpers/base-service";
import {Ward, WardDocument} from "@app/poll/ward/entities/ward.entity";
import {Request} from "express";


@Injectable()
export class WardService extends BaseService{
  constructor(@InjectModel(Ward.name) private wardModel: Model<WardDocument>) {
    super();
  }
  async create(createWardDto: CreateWardDto):Promise<Ward> {
    // Check if the name exists
    if (await this.wardModel.findOne({ name: createWardDto.name, lga_id: createWardDto.lga_id }).exec()){
      throw new HttpException(`Ward with the name (${createWardDto.name}) exists`, HttpStatus.CONFLICT)
    }

    return this.wardModel.create(createWardDto);
  }

  async findAll(req: Request): Promise<Ward[]> {
    return this.getAllData(this.wardModel, req);
  }

  async findOne(id: string): Promise<Ward> {
    return this.wardModel.findOne({ id: id });
  }

 async update(id: string, updateWardDto: UpdateWardDto): Promise<Ward> {
   // Check if the name exists
   if (await this.wardModel.findOne({ name: updateWardDto.name, lga_id: updateWardDto.lga_id, id: { $ne: id} }).exec()){
     throw new HttpException(`Lga with the name (${updateWardDto.name}) exists`, HttpStatus.CONFLICT)
   }
   return this.wardModel.findOneAndUpdate({id: id}, updateWardDto, {
     new: true, //To return the updated version of the document
     runValidators: true // To validate inputs based on the Model schema
   }).exec();

  }

  async remove(id: string) : Promise<Ward> {
    return this.wardModel.findOneAndDelete({ id: id });
  }
}
