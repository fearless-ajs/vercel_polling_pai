import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import BaseService from "@/helpers/base-service";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Unit, UnitDocument} from "@app/poll/unit/entities/unit.entity";
import {Request} from "express";
import {Ward} from "@app/poll/ward/entities/ward.entity";

@Injectable()
export class UnitService extends BaseService{
  constructor(@InjectModel(Unit.name) private unitModel: Model<UnitDocument>) {
    super();
  }

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    // Check if the name exists
    if (await this.unitModel.findOne({ name: createUnitDto.name, ward_id: createUnitDto.ward_id }).exec()){
      throw new HttpException(`Unit with the name (${createUnitDto.name}) exists`, HttpStatus.CONFLICT)
    }

    return this.unitModel.create(createUnitDto);
  }

  async findAll(req: Request): Promise<Unit[]> {
    return this.getAllData(this.unitModel, req);
  }

  async findOne(id: string): Promise<Unit> {
    return this.unitModel.findOne({ id: id });
  }
  async update(id: string, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    // Check if the name exists
    if (await this.unitModel.findOne({ name: updateUnitDto.name, ward_id: updateUnitDto.ward_id, id: { $ne: id} }).exec()){
      throw new HttpException(`Unit with the name (${updateUnitDto.name}) exists`, HttpStatus.CONFLICT)
    }
    return this.unitModel.findOneAndUpdate({id: id}, updateUnitDto, {
      new: true, //To return the updated version of the document
      runValidators: true // To validate inputs based on the Model schema
    }).exec();

  }

  async remove(id: string) : Promise<Unit> {
    return this.unitModel.findOneAndDelete({ id: id });
  }
}
