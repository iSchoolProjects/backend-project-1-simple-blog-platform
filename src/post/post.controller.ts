import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPost } from '../entity/post/post.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationService } from '../common/services/pagination.service';
import { CreatePaginationDto } from '../common/dto/create-pagination.dto';
import { CreateFilterDto } from '../common/dto/create-filter.dto';
import { FilterService } from '../common/services/filter.service';
import { User } from '../entity/user/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly paginationService: PaginationService,
    private readonly filterService: FilterService,
  ) {}

  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard)
  async readPosts(
    @Query() createPagination: CreatePaginationDto,
    @Query() setFilter: CreateFilterDto,
    @GetUser() user: User,
  ): Promise<BlogPost[]> {
    const filter = this.filterService.setFilter(setFilter);

    const pagination = this.paginationService.setPagination(createPagination);

    try {
      return await this.postService.readPosts(pagination, filter, user);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Get(':id')
  async readOne(@Param('id') id: string): Promise<BlogPost> {
    return await this.postService.readOnePost(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  async writePost(
    @Body() postDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<BlogPost> {
    return await this.postService.writePost(postDto, user);
  }

  @Delete(':id')
  async deletePost(
    @Param('id') id: string,
  ): Promise<DeleteResult | UpdateResult> {
    return await this.postService.deletePost(id);
  }

  @Put(':id')
  async editPost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    return await this.postService.editPost(id, updatePostDto);
  }
}
