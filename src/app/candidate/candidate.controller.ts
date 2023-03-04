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
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from "path";
import {Request, Response} from "express";
import ApiResponse from "@/helpers/api_response";
import {AuthGuard} from "@nestjs/passport";

@Controller('candidates')
@UseGuards(AuthGuard('jwt'))
export class CandidateController extends ApiResponse{
  constructor(private readonly candidateService: CandidateService) {
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
  async create(@Body() createCandidateDto: CreateCandidateDto, @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
  ) file: Express.Multer.File, @Res() res: Response):Promise<Response> {
    const { name, election_event_id, party_id  } =  createCandidateDto;

    const response_data = await this.candidateService.create({
      name: name,
      election_event_id,
      image: file.path,
      party_id
    });


    return this.successMessageWithData(response_data, 201, res);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request):Promise<Response> {
    const response_data = await this.candidateService.findAll();
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const response_data = await this.candidateService.findOne(id);
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
  async update(@Param('id') id: string, @Body() updateCandidateDto: UpdateCandidateDto,  @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
        fileIsRequired: false
      }),
  ) file: Express.Multer.File,@Res() res: Response): Promise<Response> {
    const { name, election_event_id, party_id  } =  updateCandidateDto;


    const response_data = await this.candidateService.update(id, {
      name: name,
      election_event_id,
      image: file?file.path:null,
      party_id
    });
    return this.successMessageWithData(response_data, 200, res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    await this.candidateService.remove(id);
    return this.successMessage('Candidate deleted', 202, res);
  }
}
