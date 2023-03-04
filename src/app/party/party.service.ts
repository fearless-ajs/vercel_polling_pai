import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import BaseService from "@/helpers/base-service";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import {Party, PartyDocument} from "@app/party/entities/party.entity";
import { deleteFile } from "@/helpers/file-processor";
import {Request} from "express";

@Injectable()
export class PartyService extends BaseService{
  constructor(@InjectModel(Party.name) private partyModel: Model<PartyDocument>) {
    super();
  }

  async create(createPartyDto: CreatePartyDto): Promise<Party> {
    const { name, acronym } =  createPartyDto;

    // Check if name exists
    if (await this.partyModel.findOne({ name })){
      // Delete logo
     await deleteFile(createPartyDto.logo);
      throw new HttpException(`Party with the name (${name}) exists`, HttpStatus.CONFLICT)
    }
    //Check if the acronym exist
    if (await this.partyModel.findOne({ acronym })){
      // Delete logo
      await deleteFile(createPartyDto.logo);
      throw new HttpException(`Party with the acronym (${acronym}) exists`, HttpStatus.CONFLICT)
    }

    return this.partyModel.create(createPartyDto)
  }

  async findAll(req: Request): Promise<Party[]> {
    return this.getAllData(this.partyModel, req);
  }

  async findOne(id: string): Promise<Party> {
   // Check if the id is valid
   if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid party id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    return this.partyModel.findOne({ _id: id });
  }

  async update(id: string, updatePartyDto: UpdatePartyDto) {
    const { name, acronym } =  updatePartyDto;

    // Check if the id is valid
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid party id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Find the party exists
    const party = await this.findOne(id)
    if (!party){
      throw new HttpException(`Unknown party id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Check if name exists
    if (await this.partyModel.findOne({ name,  id: { $ne: id}  })){
      // Delete logo
      await deleteFile(updatePartyDto.logo);
      throw new HttpException(`Party with the name (${name}) exists`, HttpStatus.CONFLICT)
    }
    //Check if the acronym exist
    if (await this.partyModel.findOne({ acronym, id: { $ne: id}  })){
      // Delete logo
      await deleteFile(updatePartyDto.logo);
      throw new HttpException(`Party with the acronym (${acronym}) exists`, HttpStatus.CONFLICT)
    }

    if (updatePartyDto.logo){
      // Delete logo
      await deleteFile(party.logo);
    }else {
      updatePartyDto.logo = party.logo;
    }

    return this.partyModel.findOneAndUpdate({id: id}, updatePartyDto, {
      new: true, //To return the updated version of the document
      runValidators: true // To validate inputs based on the Model schema
    }).exec();
  }

  async remove(id: string) {
    // Check if the id is valid
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid party id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Find the election event if i exists
    if (!await this.findOne(id)){
      throw new HttpException(`Unknown election event id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }
    const party = await this.partyModel.findOne({_id: id});
    await deleteFile(party.logo);

    return party.delete();
  }
}
