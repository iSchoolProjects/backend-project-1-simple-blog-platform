import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from '../../entity/post/post.entity';
import { PostRepository } from '../../repository/post/post.repository';
import { CreatePaginationDto } from '../../common/dto/create-pagination.dto';
import { CreatePostAdminDto } from './dto/create-post-admin.dto';
import { CommonService } from '../../common/services/common.service';
import { UpdatePostAdminDto } from './dto/update-post-admin.dto';
import { UpdateResult } from 'typeorm';
import { CreatePostsAdminDto } from './dto/create-posts-admin.dto';
import { UpdatePostsAdminDto } from './dto/update-posts-admin.dto';

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
      where: { ...filter },
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

  async deletePost(id: string): Promise<void> {
    try {
      const post = await this.postRepository.findOneOrFail(id);
      await this.deleteOrUpdate(post);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async multipleEntries(
    createPostsAdminDto: CreatePostsAdminDto,
  ): Promise<BlogPost[]> {
    const posts = [];
    for (let i = 0; i < createPostsAdminDto.posts.length; i++) {
      posts.push(createPostsAdminDto.posts[i]);
      posts[i] = await this.commonService.slugGenerator(posts[i]);

      await this.postRepository.save(posts[i]);
    }
    return posts;
  }

  async multipleDeletion(ids: number[]): Promise<void> {
    try {
      for (let i = 0; i < ids.length; i++) {
        const post = await this.postRepository.findOneOrFail(ids[i]);
        await this.deleteOrUpdate(post);
      }
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async multipleEdits(updatePostsAdminDto: UpdatePostsAdminDto): Promise<void> {
    try {
      for (const id of updatePostsAdminDto.ids) {
        const post = await this.postRepository.findOneOrFail(id);
        post.user = updatePostsAdminDto.user;

        await this.postRepository.update(id, post);
      }
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async deleteOrUpdate(post: BlogPost): Promise<void> {
    if (post.isDeleted) {
      await this.postRepository.delete(post.postId);
    }
    post.isDeleted = true;
    await this.postRepository.update(post.postId, post);
  }
}
