import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from '../entity/post/post.entity';
import { CommonService } from '../common/services/common.service';
import { PaginationService } from '../common/services/pagination.service';
import { FilterService } from '../common/services/filter.service';
import { AuthModule } from '../auth/auth.module';
import { PostRepository } from '../repository/post/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, BlogPost]), AuthModule],
  controllers: [PostController],
  providers: [PostService, CommonService, PaginationService, FilterService],
})
export class PostModule {}
