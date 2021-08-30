import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminPostService } from './admin-post.service';
import { BlogPost } from '../../entity/post/post.entity';
import { CreatePaginationDto } from '../../common/dto/create-pagination.dto';
import { PaginationService } from '../../common/services/pagination.service';
import { CreateFilterDto } from '../../common/dto/create-filter.dto';
import { FilterService } from '../../common/services/filter.service';
import { CreatePostAdminDto } from './dto/create-post-admin.dto';
import { UpdatePostAdminDto } from './dto/update-post-admin.dto';
import { UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { AdminGuard } from '../../auth/guards/admin.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/posts')
export class AdminPostController {
  constructor(
    private readonly adminPostService: AdminPostService,
    private readonly paginationService: PaginationService,
    private readonly filterService: FilterService,
  ) {}

  @Get()
  async getAllPosts(
    @Query() createPaginationDto: CreatePaginationDto,
    @Query() setFilterDto: CreateFilterDto,
  ): Promise<BlogPost[]> {
    const pagination =
      this.paginationService.setPagination(createPaginationDto);
    const filter = this.filterService.setFilter(setFilterDto);
    return await this.adminPostService.getAllPosts(pagination, filter);
  }

  @Get(':id')
  getOnePost(@Param('id') id: string): Promise<BlogPost> {
    try {
      return this.adminPostService.getOnePost(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Post()
  async createPost(
    @Body() createPostDto: CreatePostAdminDto,
  ): Promise<BlogPost> {
    try {
      return await this.adminPostService.createPost(createPostDto);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  async editPost(
    @Param('id') id: string,
    @Body() updatePostAdminDto: UpdatePostAdminDto,
  ): Promise<UpdateResult> {
    return await this.adminPostService.editPost(id, updatePostAdminDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.adminPostService.deletePost(id);
  }
}
