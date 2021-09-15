import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entity/category/category.entity';
import { ExceptionService } from '../common/services/exception.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, ExceptionService],
})
export class CategoryModule {}
