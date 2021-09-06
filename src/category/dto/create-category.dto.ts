import { Category } from '../../entity/category/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../entity/user/user.entity';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsOptional()
  parent: Category;
  @ApiProperty()
  @IsNotEmpty()
  user: User;
}
