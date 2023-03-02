import {Controller, Get, Post, Body, Patch, Param, Delete, Res, Req} from '@nestjs/common';
import { WardService } from './ward.service';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import ApiResponse from "@/helpers/api_response";
import {Request, Response} from "express";

@Controller('wards')
export class WardController extends ApiResponse{
  constructor(private readonly wardService: WardService) {
    super();
  }

  @Post()
  async create(@Body() createWardDto: CreateWardDto, @Res() res: Response): Promise<any> {
    const response_data = await this.wardService.create(createWardDto);
    return this.successMessageWithData(response_data, 201, res);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request):Promise<any> {
    const response_data = await this.wardService.findAll(req);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const response_data = await this.wardService.findOne(id);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWardDto: UpdateWardDto, @Res() res: Response): Promise<any> {
    const response_data = await  this.wardService.update(id, updateWardDto);
    return this.successMessageWithData(response_data, 200, res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<any> {
    await this.wardService.remove(id);
    return this.successMessage('State deleted', 202, res);
  }
}
