import {Controller, Get, Post, Body, Patch, Param, Delete, Res, Req} from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import ApiResponse from "@/helpers/api_response";
import {Request, Response} from "express";

@Controller('units')
export class UnitController extends ApiResponse{
  constructor(private readonly unitService: UnitService) {
    super();
  }

  @Post()
  async create(@Body() createUnitDto: CreateUnitDto, @Res() res: Response):Promise<any> {
    const response_data = await this.unitService.create(createUnitDto);
    return this.successMessageWithData(response_data, 201, res);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request):Promise<any> {
    const response_data = await this.unitService.findAll(req);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response):Promise<any> {
    const response_data = await this.unitService.findOne(id);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto, @Res() res: Response): Promise<any>{
    const response_data = await  this.unitService.update(id, updateUnitDto);
    return this.successMessageWithData(response_data, 200, res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<any> {
    await this.unitService.remove(id);
    return this.successMessage('State deleted', 202, res);
  }
}
