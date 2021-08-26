import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../entity/category/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteResult } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async readCategories(): Promise<Category[]> {
    return await this.categoryService.readCategories();
  }

  @Get(':id')
  async readCategory(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.readCategory(id);
  }

  @Post()
  async addCategory(@Body() categoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryService.addCategory(categoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<DeleteResult> {
    return await this.categoryService.deleteCategory(id);
  }

  @Put(':id')
  async editCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.editCategory(id, updateCategoryDto);
  }
}
