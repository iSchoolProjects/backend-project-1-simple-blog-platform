import { Injectable } from '@nestjs/common';
import { Category } from '../entity/category/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../repository/category/category.repository';
import { DeleteResult } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ExceptionService } from '../common/services/exception.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: CategoryRepository,
    private exceptionService: ExceptionService,
  ) {}
  async readCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async readCategory(id: string): Promise<Category> {
    try {
      return await this.categoryRepository.findOneOrFail(id);
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async addCategory(categoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = new Category(categoryDto);

      return await this.categoryRepository.save(category);
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }

  async editCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoryRepository.update(id, updateCategoryDto);
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }
}
