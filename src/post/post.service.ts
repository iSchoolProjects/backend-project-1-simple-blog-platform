import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPost } from '../entity/post/post.entity';
import { PostRepository } from '../repository/post/post.repository';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { CommonService } from '../common/services/common.service';
import { CreatePaginationDto } from '../common/dto/create-pagination.dto';
import { User } from '../entity/user/user.entity';
import { ExceptionService } from '../common/services/exception.service';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private commonService: CommonService,
    private exceptionService: ExceptionService,
  ) {}

  async readPosts(
    pagination: CreatePaginationDto,
    filter,
    user: User,
  ): Promise<BlogPost[]> {
    return await this.postRepository.getSomePosts(pagination, filter, user);
  }

  async readOnePost(id: string, user: User): Promise<BlogPost> {
    try {
      return await this.postRepository.findOneOrFail({
        where: { postId: id, user },
      });
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async writePost(postDto: CreatePostDto, user: User): Promise<BlogPost> {
    try {
      let post = new BlogPost(postDto);

      post = await this.commonService.slugGenerator(post);
      post.user = user;

      return await this.postRepository.save(post);
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async deletePost(
    id: string,
    user: User,
  ): Promise<DeleteResult | UpdateResult> {
    try {
      const post = await this.postRepository.findOneOrFail({
        where: { postId: id, user },
      });

      if (post.isDeleted) {
        return await this.postRepository.delete(id);
      }
      post.isDeleted = true;
      return await this.postRepository.update(id, post);
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async editPost(
    id: string,
    updatePostDto: UpdatePostDto,
    user: User,
  ): Promise<UpdateResult> {
    try {
      let post = await this.postRepository.findOneOrFail({
        where: { postId: id, user },
      });
      post = { ...post, ...updatePostDto };
      post = await this.commonService.slugGenerator(post);
      return await this.postRepository.update(id, post);
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }
}
