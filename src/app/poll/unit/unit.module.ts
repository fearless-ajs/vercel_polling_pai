import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Unit, UNitSchema} from "@app/poll/unit/entities/unit.entity";

@Module({
  controllers: [UnitController],
  providers: [UnitService],
  imports: [
    MongooseModule.forFeature([{ name: Unit.name, schema: UNitSchema }]),
  ],
  exports: [UnitService]
})
export class UnitModule {}
