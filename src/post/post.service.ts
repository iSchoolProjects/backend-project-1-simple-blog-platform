import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPost } from '../entity/post/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../repository/post/post.repository';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { CommonService } from '../common/services/common.service';
import { CreatePaginationDto } from '../common/dto/create-pagination.dto';
import { User } from '../entity/user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(BlogPost)
    private postRepository: PostRepository,
    private commonService: CommonService,
  ) {}

  async readPosts(
    pagination: CreatePaginationDto,
    filter,
  ): Promise<BlogPost[]> {
    return await this.postRepository.find({
      ...filter,
      take: pagination.limit,
      skip: pagination.skip,
      relations: ['user'],
    });
  }

  async readOnePost(id: string): Promise<BlogPost> {
    try {
      return await this.postRepository.findOneOrFail(id, {
        relations: ['category', 'user'],
      });
    } catch (e) {
      return e.message;
    }
  }

  async writePost(postDto: CreatePostDto, user: User): Promise<BlogPost> {
    try {
      let post = new BlogPost(postDto);

      post = await this.commonService.slugGenerator(post);
      post.user = user;

      return await this.postRepository.save(post);
    } catch (e) {
      return e.message;
    }
  }

  async deletePost(id: string): Promise<DeleteResult | UpdateResult> {
    try {
      const post = await this.postRepository.findOneOrFail(id);
      if (post.isDeleted) {
        return await this.postRepository.delete(id);
      }
      post.isDeleted = true;
      return await this.postRepository.update(id, post);
    } catch (e) {
      return e.message();
    }
  }

  async editPost(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    let post = new BlogPost(updatePostDto);
    post = await this.commonService.slugGenerator(post);
    return await this.postRepository.update(id, post);
  }
}
