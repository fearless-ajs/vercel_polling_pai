import { Module } from '@nestjs/common';
import { AccessTokenService } from './access-token.service';
import { AccessTokenController } from './access-token.controller';

@Module({
  controllers: [AccessTokenController],
  providers: [AccessTokenService]
})
export class AccessTokenModule {}
