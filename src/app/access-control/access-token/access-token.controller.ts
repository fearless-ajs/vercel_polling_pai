import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccessTokenService } from './access-token.service';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { UpdateAccessTokenDto } from './dto/update-access-token.dto';

@Controller('access-token')
export class AccessTokenController {
  constructor(private readonly accessTokenService: AccessTokenService) {}

  @Post()
  create(@Body() createAccessTokenDto: CreateAccessTokenDto) {
    return this.accessTokenService.create(createAccessTokenDto);
  }

  @Get()
  findAll() {
    return this.accessTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessTokenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccessTokenDto: UpdateAccessTokenDto) {
    return this.accessTokenService.update(+id, updateAccessTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessTokenService.remove(+id);
  }
}
