import { Injectable } from '@nestjs/common';
import { Category } from '../entity/category/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../repository/category/category.repository';
import { DeleteResult } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: CategoryRepository,
  ) {}
  async readCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async readCategory(id: string): Promise<Category> {
    try {
      return await this.categoryRepository.findOneOrFail(id);
    } catch (e) {
      return e.message;
    }
  }

  async addCategory(categoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = new Category(categoryDto);

      return await this.categoryRepository.save(category);
    } catch (e) {
      return e.message;
    }
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    try {
      return await this.categoryRepository.delete(id);
    } catch (e) {
      return e.message;
    }
  }

  async editCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoryRepository.update(id, updateCategoryDto);
    } catch (e) {
      return e.message;
    }
  }
}
