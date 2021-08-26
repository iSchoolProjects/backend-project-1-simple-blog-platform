import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../entity/category/category.entity';

export class UpdateCategoryDto {
  @IsString()
  @ApiProperty()
  title: string;
  @ApiProperty()
  parent: Category;
}
