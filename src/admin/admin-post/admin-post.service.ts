import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from '../../entity/post/post.entity';
import { PostRepository } from '../../repository/post/post.repository';
import { CreatePaginationDto } from '../../common/dto/create-pagination.dto';
import { CreatePostAdminDto } from './dto/create-post-admin.dto';
import { CommonService } from '../../common/services/common.service';
import { UpdatePostAdminDto } from './dto/update-post-admin.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class AdminPostService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly postRepository: PostRepository,
    private readonly commonService: CommonService,
  ) {}
  async getAllPosts(
    pagination: CreatePaginationDto,
    filter,
  ): Promise<BlogPost[]> {
    return await this.postRepository.find({
      take: pagination.limit,
      skip: pagination.skip,
      ...filter,
      relations: ['user'],
    });
  }

  async getOnePost(id: string): Promise<BlogPost> {
    try {
      return await this.postRepository.findOneOrFail(id, {
        relations: ['user'],
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async createPost(createPostAdminDto: CreatePostAdminDto): Promise<BlogPost> {
    let post = new BlogPost(createPostAdminDto);
    post = await this.commonService.slugGenerator(post);
    return await this.postRepository.save(post);
  }

  async editPost(
    id: string,
    updatePostAdminDto: UpdatePostAdminDto,
  ): Promise<UpdateResult> {
    const post = new BlogPost(updatePostAdminDto);
    return await this.postRepository.update(id, post);
  }

  async deletePost(id: string): Promise<DeleteResult | UpdateResult> {
    try {
      const post = await this.postRepository.findOneOrFail(id);
      if (post.isDeleted) {
        return this.postRepository.delete(id);
      }
      post.isDeleted = true;
      return this.postRepository.update(id, post);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
