import { Module } from '@nestjs/common';
import { LgaService } from './lga.service';
import { LgaController } from './lga.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Lga, LgaSchema} from "@app/poll/lga/entities/lga.entity";

@Module({
  controllers: [LgaController],
  providers: [LgaService],
  imports: [
    MongooseModule.forFeature([{ name: Lga.name, schema: LgaSchema }]),
  ],
  exports: [LgaService]
})
export class LgaModule {}
