import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategy/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./auth.constant";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {HttpModule} from "@nestjs/axios";


@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  imports: [
      HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
              timeout: configService.get('HTTP_TIMEOUT'),
              maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
          }),
          inject: [ConfigService],
      }),
      UserModule,
      PassportModule,
      JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '30d' },
      }),
  ],

})
export class AuthenticationModule {}
