import { Module } from '@nestjs/common';
import { AdminPostModule } from './admin-post/admin-post.module';
import { AdminCategoryModule } from './admin-category/admin-category.module';

@Module({
  imports: [AdminPostModule, AdminCategoryModule],
})
export class AdminModule {}
