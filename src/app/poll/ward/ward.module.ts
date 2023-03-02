import { Module } from '@nestjs/common';
import { WardService } from './ward.service';
import { WardController } from './ward.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Ward, WardSchema} from "@app/poll/ward/entities/ward.entity";

@Module({
  controllers: [WardController],
  providers: [WardService],
  imports: [
    MongooseModule.forFeature([{ name: Ward.name, schema: WardSchema }]),
  ]
})
export class WardModule {}
