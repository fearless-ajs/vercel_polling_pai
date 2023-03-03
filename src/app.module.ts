import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StateModule } from '@app/poll/state/state.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import { LgaModule } from '@app/poll/lga/lga.module';
import { WardModule } from '@app/poll/ward/ward.module';
import { UnitModule } from '@app/poll/unit/unit.module';
import { AccessTokenModule } from '@app/access-control/access-token/access-token.module';
import { CandidateModule } from '@app/candidate/candidate.module';
import { ElectionEventModule } from '@app/election-event/election-event.module';
import { PartyModule } from '@app/party/party.module';
import { ElectionEventPartyModule } from '@app/election-event-party/election-event-party.module';
import {MulterModule} from "@nestjs/platform-express";
import { ElectionEventFeedModule } from './app/election-event-feed/election-event-feed.module';

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
      MulterModule.register({ dest: './uploads' }),
      StateModule,
      LgaModule,
      WardModule,
      UnitModule,
      AccessTokenModule,
      CandidateModule,
      ElectionEventModule,
      PartyModule,
      ElectionEventPartyModule,
      ElectionEventFeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
