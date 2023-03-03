import {Controller, Get, Post, Body, Patch, Param, Delete, Res, Req} from '@nestjs/common';
import { ElectionEventPartyService } from './election-event-party.service';
import { CreateElectionEventPartyDto } from './dto/create-election-event-party.dto';
import ApiResponse from "@/helpers/api_response";
import {Request, Response} from "express";

@Controller('election-event-parties')
export class ElectionEventPartyController extends ApiResponse{
  constructor(private readonly electionEventPartyService: ElectionEventPartyService) {
    super();
  }

  @Post()
  async create(@Body() createElectionEventPartyDto: CreateElectionEventPartyDto,  @Res() res: Response): Promise<Response> {
    const response_data = await this.electionEventPartyService.create(createElectionEventPartyDto);
    return this.successMessageWithData(response_data, 201, res)
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request):Promise<Response> {
    const response_data = await this.electionEventPartyService.findAll();
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const response_data = await this.electionEventPartyService.findOne(id);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }


  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    await this.electionEventPartyService.remove(id);
    return this.successMessage('Party deleted', 202, res);
  }
}
