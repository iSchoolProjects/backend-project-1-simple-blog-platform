import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../../entity/category/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
