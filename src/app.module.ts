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
import { ElectionEventFeedModule } from '@app/election-event-feed/election-event-feed.module';
import { UserModule } from '@app/user/user.module';
import {AuthenticationModule} from "@app/auth/authentication.module";
import {MailerModule} from "@nestjs-modules/mailer";
import { MailingModule } from './providers/mailing/mailing.module';
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";

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
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        auth: {
          user: '81806e976d160d',
          pass: '9a6c8b101cdbd6'
        },
        port: 2525
      },
      template: {
        dir: __dirname + '/mails',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      }
    }),
      AuthenticationModule,
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
      UserModule,
      MailingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
