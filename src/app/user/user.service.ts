import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {randomInt} from "crypto";
import * as bcrypt from 'bcrypt';
import mongoose, {Model} from "mongoose";
import {User, UserDocument} from "@app/user/entities/user.entity";
import {InjectModel} from "@nestjs/mongoose";
import {Request, Response} from "express";
import {deleteFile} from "@/helpers/file-processor";
import BaseService from "@/helpers/base-service";
import {Party} from "@app/party/entities/party.entity";
import {MailingService} from "@/providers/mailing/mailing.service";
import config from "@config/config";

@Injectable()
export class UserService extends BaseService{
  constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      private mailingService: MailingService
  ) {
    super();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const { username, name, email, country, mobile_number, image, password } = createUserDto;


    // generate verification code
    const code = randomInt(100000, 9999999);

    // @ts-ignore
    const hash = await bcrypt.hash(password, 10);

    // CHeck if the phone number already exists.
    if (await this.findOneByEmail(email)){
      throw new HttpException(`Email exist`, HttpStatus.CONFLICT)
    }

    if (await this.findOneByFilter({username: username })){
      throw new HttpException(`Username exists`, HttpStatus.CONFLICT)
    }

    // console.log(hash);
    // Send verification code as sms to user email
    // await this.mailingService.sendPlainTextEmail('adurotimijoshua@gmail.com', 'mail@telvida.com', 'Testin email', 'Welcomdear')


    const user = new this.userModel({
      username,
      name,
      email,
      country,
      image,
      mobile_number,
      password: hash,
      verificationToken: code
    });

    const userDetails =  user.save();

    this.mailingService.sendWelcomeMessage(email, config.email, `Welcome to ${config.appName}`, {
      user: {
        username,
        name,
        email,
        token: code
      },
      appInfo: {
        name: config.appName,
        email: config.email,
        companyName: config.companyName
      }
    })

    return userDetails
  }

  async findAll(req: Request): Promise<Party[]> {
    return this.getAllData(this.userModel, req);
  }

  async findOne(id: string): Promise<User> {
    // Check if the user_id is valid
    // Check if the account object_id is valid
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException(`Invalid user id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    return this.userModel.findOne({_id: id});
  }



  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).select('+pin, +verificationToken');
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).select('+pin');
  }


  findOneByFilter(filter: any): Promise<User> {
    return this.userModel.findOne({ ...filter }).exec();
  }



  async checkUserVerificationToken(verificationToken:string):Promise<User> {
    return this.userModel.findOne({verificationToken: verificationToken, active: false, verificationStatus: false});
  }



  async checkUserPasswordToken(verificationToken:string):Promise<User> {
    return this.userModel.findOne({ passwordResetToken: verificationToken });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { username, name, email, country, mobile_number, image, password } = updateUserDto;

    // Check if the id is valid
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid user id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Find the party exists
    const user = await this.findOne(id)
    if (!user){
      throw new HttpException(`Unknown user id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }


    // CHeck if the email already exists.
    if (email){
      if (await this.userModel.findOne({ email,  id: { $ne: id}  })){
        throw new HttpException(`Email exist`, HttpStatus.CONFLICT)
      }
    }


    if (username){
      if (await this.userModel.findOne({ username,  id: { $ne: id}  })){
        throw new HttpException(`Username exists`, HttpStatus.CONFLICT)
      }
    }

    if (updateUserDto.image){
      // Delete logo
      await deleteFile(user.image);
    }else {
      updateUserDto.image = user.image;
    }

    return this.userModel.findOneAndUpdate({_id: id}, updateUserDto, {
      new: true, //To return the updated version of the document
      runValidators: true // To validate inputs based on the Model schema
    }).exec();
  }

  async findOneByIdAndUpdate(id: string, userData): Promise<User>{
    // Update the user
    return this.userModel.findOneAndUpdate({_id: id}, userData, {
      new: true, //To return the updated version of the document
      runValidators: true // To validate inputs based on the Model schema
    }).exec()
  }

  async remove(id: string): Promise<User> {
    if (!mongoose.isValidObjectId(id)){
      throw new HttpException(`Invalid user id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }

    // Find the election event if i exists
    if (!await this.findOne(id)){
      throw new HttpException(`Unknown election user id (${id})`, HttpStatus.NOT_ACCEPTABLE)
    }
    const user = await this.userModel.findOne({_id: id});
    await deleteFile(user.image);

    return user.delete();
  }
  }
