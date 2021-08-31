import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entity/user/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '../config/multerconfig';

@ApiTags('User')
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
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadFile(file);
  }
}
