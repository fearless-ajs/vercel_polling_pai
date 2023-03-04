import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Res, Req, UseGuards
} from '@nestjs/common';
import { ElectionEventFeedService } from './election-event-feed.service';
import { CreateElectionEventFeedDto } from './dto/create-election-event-feed.dto';
import { UpdateElectionEventFeedDto } from './dto/update-election-event-feed.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from "path";
import {Request, Response} from "express";
import ApiResponse from "@/helpers/api_response";
import {AuthGuard} from "@nestjs/passport";

@Controller('election-event-feeds')
@UseGuards(AuthGuard('jwt'))
export class ElectionEventFeedController extends ApiResponse{
  constructor(private readonly electionEventFeedService: ElectionEventFeedService) {
    super();
  }

  @Post()
  @UseInterceptors(
      FileInterceptor('image',  {
        storage: diskStorage({
          destination: './uploads/images',
          filename: (req, file, callback) => {
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
      })
  )
  async create(@Body() createElectionEventFeedDto: CreateElectionEventFeedDto, @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
  ) file: Express.Multer.File, @Res() res: Response): Promise<Response> {
    const { election_event_id, state_id, lga_id, unit_id, user_id, comment, image } = createElectionEventFeedDto;

    const response_data = await this.electionEventFeedService.create({
      election_event_id,
      state_id,
      lga_id,
      unit_id,
      user_id,
      comment,
      image: file.path,
    });

    return this.successMessageWithData(response_data, 201, res);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request):Promise<Response> {
    const response_data = await this.electionEventFeedService.findAll();
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const response_data = await this.electionEventFeedService.findOne(id);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Patch(':id')
  @UseInterceptors(
      FileInterceptor('image',  {
        storage: diskStorage({
          destination: './uploads/images',
          filename: (req, file, callback) => {
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            const filename = `${uniqueSuffix}${ext}`;
            callback(null, filename);
          },
        }),
      })
  )
  async update(@Param('id') id: string, @Body() updateElectionEventFeedDto: UpdateElectionEventFeedDto, @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
        fileIsRequired: false
      }),
  ) file: Express.Multer.File,@Res() res: Response): Promise<Response> {
    const { election_event_id, state_id, lga_id, unit_id, user_id, comment, image } = updateElectionEventFeedDto;


    const response_data = await this.electionEventFeedService.update(id, {
      election_event_id,
      state_id,
      lga_id,
      unit_id,
      user_id,
      comment,
      image: file?file.path:null,
    });
    return this.successMessageWithData(response_data, 200, res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    await this.electionEventFeedService.remove(id);
    return this.successMessage('Candidate deleted', 202, res);
  }
}
