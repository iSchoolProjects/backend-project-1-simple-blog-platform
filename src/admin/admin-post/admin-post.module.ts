import { Module } from '@nestjs/common';
import { AdminPostController } from './admin-post.controller';
import { AdminPostService } from './admin-post.service';

@Module({
  controllers: [AdminPostController],
  providers: [AdminPostService]
})
export class AdminPostModule {}
