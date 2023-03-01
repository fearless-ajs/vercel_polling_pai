import {Controller, Get, Post, Body, Patch, Param, Delete, Res, Req} from '@nestjs/common';
import { LgaService } from './lga.service';
import { CreateLgaDto } from './dto/create-lga.dto';
import { UpdateLgaDto } from './dto/update-lga.dto';
import ApiResponse from "@/helpers/api_response";
import {Request, Response} from "express";

@Controller('lgas')
export class LgaController extends ApiResponse{
  constructor(private readonly lgaService: LgaService) {
    super();
  }

  @Post()
  async create(@Body() createLgaDto: CreateLgaDto,  @Res() res: Response):Promise<any> {
    const response_data = await this.lgaService.create(createLgaDto);
    return this.successMessageWithData(response_data, 201, res);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request):Promise<any> {
    const response_data = await this.lgaService.findAll(req);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const response_data = await this.lgaService.findOne(id);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLgaDto: UpdateLgaDto,  @Res() res: Response) {
    const response_data = await  this.lgaService.update(id, updateLgaDto);
    return this.successMessageWithData(response_data, 200, res);
  }

  @Delete(':id')
 async remove(@Param('id') id: string, @Res() res: Response): Promise<any> {
    await this.lgaService.remove(id);
    return this.successMessage('State deleted', 202, res);
  }
}
