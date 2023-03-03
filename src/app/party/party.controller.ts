import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
  MaxFileSizeValidator, ParseFilePipe, FileTypeValidator, Req
} from '@nestjs/common';
import { PartyService } from './party.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import ApiResponse from "@/helpers/api_response";
import {Request, Response} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import { extname } from 'path';

@Controller('parties')
export class PartyController extends ApiResponse{
  constructor(private readonly partyService: PartyService) {
    super();
  }

  @Post()
  @UseInterceptors(
      FileInterceptor('logo',  {
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
  async create(@Body() createPartyDto: CreatePartyDto, @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
  ) file: Express.Multer.File, @Res() res: Response):Promise<Response> {


    const { name, acronym, chairman } =  createPartyDto;

    const response_data = await this.partyService.create({
      name: name,
      acronym: acronym,
      logo: file.path,
      chairman: chairman
    });
    return this.successMessageWithData(response_data, 201, res);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request):Promise<Response> {
    const response_data = await this.partyService.findAll(req);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const response_data = await this.partyService.findOne(id);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Patch(':id')
  @UseInterceptors(
      FileInterceptor('logo',  {
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
  async update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto, @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
        fileIsRequired: false
      }),
  ) file: Express.Multer.File,  @Res() res: Response): Promise<Response> {
    const { name, acronym, chairman } =  updatePartyDto;

    const response_data = await this.partyService.update(id, {
      name: name,
      acronym: acronym,
      logo: file?file.path:null,
      chairman: chairman
    });
    return this.successMessageWithData(response_data, 200, res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    await this.partyService.remove(id);
    return this.successMessage('Party deleted', 202, res);
  }
}
