import { Injectable } from '@nestjs/common';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { UpdateAccessTokenDto } from './dto/update-access-token.dto';

@Injectable()
export class AccessTokenService {
  create(createAccessTokenDto: CreateAccessTokenDto) {
    return 'This action adds a new accessToken';
  }

  findAll() {
    return `This action returns all accessToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessToken`;
  }

  update(id: number, updateAccessTokenDto: UpdateAccessTokenDto) {
    return `This action updates a #${id} accessToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessToken`;
  }
}
