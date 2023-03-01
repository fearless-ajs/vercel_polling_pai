import {Controller, Get, Post, Body, Patch, Param, Delete, Res, Req} from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import ApiResponse from "../../../helpers/api_response";
import {Request, Response} from "express";

@Controller('states')
export class StateController extends ApiResponse{
  constructor(private readonly stateService: StateService) {
    super();
  }

  @Post()
  async create(@Body() createStateDto: CreateStateDto, @Res() res: Response) {
    const response_data = await this.stateService.create(createStateDto);
    return this.successMessageWithData(response_data, 201, res);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request): Promise<any> {
    const response_data = await this.stateService.findAll(req);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }


  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<any>  {
    const response_data = await this.stateService.findOne(id);
    return this.successMessageWithData(response_data, 201, res);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto, @Res() res: Response): Promise<any> {
    const response_data = await  this.stateService.update(id, updateStateDto);
    return this.successMessageWithData(response_data, 201, res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<any> {
    const response_data = await this.stateService.remove(id);
    return this.successMessage('State deleted', 202, res);
  }
}
