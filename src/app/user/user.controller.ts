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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from "path";
import {Request, Response} from "express";
import ApiResponse from "@/helpers/api_response";
import {AuthGuard} from "@nestjs/passport";

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController extends ApiResponse{
  constructor(private readonly userService: UserService) {
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
  async create(@Body() createUserDto: CreateUserDto,  @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
        fileIsRequired: false
      }),
  ) file: Express.Multer.File,@Res() res: Response): Promise<Response> {

    createUserDto.image =  file? file.path:null;
    const response_data = await this.userService.create(createUserDto);
    // @ts-ignore
    const { _id, username, email, mobile_number, name, country, image, verificationStatus, createdAt, updatedAt } = response_data;

    return this.successMessageWithData({
      _id,
      fullname: name,
      email,
      username,
      mobile_number,
      country,
      image,
      createdAt,
      updatedAt,
      verificationStatus: verificationStatus
    }, 201, res);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: Request):Promise<Response> {
    const response_data = await this.userService.findAll(req);
    return this.successMessageWithDataCollection(response_data, 200, res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    const response_data = await this.userService.findOne(id);
    return this.successMessageWithData(response_data, 200, res);
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
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,  @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
        fileIsRequired: false
      }),
  ) file: Express.Multer.File,@Res() res: Response): Promise<Response> {

    updateUserDto.image =  file? file.path:null;
    const response_data = await this.userService.update(id, updateUserDto);

    // @ts-ignore
    const { _id, username, email, mobile_number, name, country, image, verificationStatus, createdAt, updatedAt } = response_data;

    return this.successMessageWithData({
      _id,
      fullname: name,
      email,
      username,
      mobile_number,
      country,
      image,
      createdAt,
      updatedAt,
      verificationStatus: verificationStatus
    }, 200, res);

  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    await this.userService.remove(id);
    return this.successMessage('User deleted', 202, res);
  }
}
