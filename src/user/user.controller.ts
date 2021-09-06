import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entity/user/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/get-user.decorator';
import { UserPhoto } from '../entity/user-photo/user-photo.entity';
import setMulterConfig from '../config/multerconfig';
import { PathUploadEnum } from '../enum/path-upload.enum';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUser(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.addUser(createUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.deleteUser(id);
  }

  @Put(':id')
  async editUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userService.editUser(id, updateUserDto);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', setMulterConfig(PathUploadEnum.USER_PHOTO)),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ): Promise<UserPhoto> {
    return this.userService.uploadFile(file, user);
  }

  @Post('upload/multiple')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor(
      'file',
      parseInt(process.env.MAX_NUMBER_OF_USER_PHOTOS_FILES),
      setMulterConfig(PathUploadEnum.USER_PHOTO),
    ),
  )
  uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @GetUser() user: User,
  ): Promise<void> {
    return this.userService.uploadMultipleFiles(files, user);
  }
}
