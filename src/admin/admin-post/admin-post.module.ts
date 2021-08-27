import { Module } from '@nestjs/common';
import { AdminPostController } from './admin-post.controller';
import { AdminPostService } from './admin-post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from '../../entity/post/post.entity';
import { PaginationService } from '../../common/services/pagination.service';
import { FilterService } from '../../common/services/filter.service';
import { CommonService } from '../../common/services/common.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  controllers: [AdminPostController],
  providers: [
    AdminPostService,
    PaginationService,
    FilterService,
    CommonService,
  ],
})
export class AdminPostModule {}
