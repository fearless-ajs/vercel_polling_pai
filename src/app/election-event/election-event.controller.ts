import {Controller, Get, Post, Body, Patch, Param, Delete, Res, Req} from '@nestjs/common';
import { ElectionEventService } from './election-event.service';
import { CreateElectionEventDto } from './dto/create-election-event.dto';
import { UpdateElectionEventDto } from './dto/update-election-event.dto';
import ApiResponse from "@/helpers/api_response";
import {Request, Response} from "express";

@Controller('election-events')
export class ElectionEventController extends ApiResponse{
  constructor(private readonly electionEventService: ElectionEventService) {
    super();
  }

  @Post()
  async create(@Body() createElectionEventDto: CreateElectionEventDto, @Res() res: Response): Promise<Response> {
    const response_data = await this.electionEventService.create(createElectionEventDto);
    return this.successMessageWithData(response_data, 201, res);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request):Promise<Response> {
    const response_data = await this.electionEventService.findAll(req);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }


  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const response_data = await this.electionEventService.findOne(id);
    return this.successMessageWithData(response_data, 200, res);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateElectionEventDto: UpdateElectionEventDto, @Res() res: Response): Promise<Response> {
    const response_data = await  this.electionEventService.update(id, updateElectionEventDto);
    return this.successMessageWithData(response_data, 200, res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    await this.electionEventService.remove(id);
    return this.successMessage('Election event deleted', 202, res);
  }
}
