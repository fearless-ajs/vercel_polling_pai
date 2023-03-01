import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StateModule } from '@app/poll/state/state.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import { LgaModule } from '@app/poll/lga/lga.module';
import { WardModule } from '@app/poll/ward/ward.module';
import { UnitModule } from '@app/poll/unit/unit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), // Loaded from .ENV
      })
    }),
      StateModule,
      LgaModule,
      WardModule,
      UnitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
