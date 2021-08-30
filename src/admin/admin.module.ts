import { Module } from '@nestjs/common';
import { AdminPostModule } from './admin-post/admin-post.module';
import { AdminCategoryModule } from './admin-category/admin-category.module';
import { AdminUserModule } from './admin-user/admin-user.module';

@Module({
  imports: [AdminPostModule, AdminCategoryModule, AdminUserModule],
})
export class AdminModule {}
