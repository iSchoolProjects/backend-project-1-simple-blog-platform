import { Module } from '@nestjs/common';
import { AdminCategoryController } from './admin-category.controller';
import { AdminCategoryService } from './admin-category.service';

@Module({
  controllers: [AdminCategoryController],
  providers: [AdminCategoryService]
})
export class AdminCategoryModule {}
