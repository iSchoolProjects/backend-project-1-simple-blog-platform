import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../../entity/category/category.entity';
import { User } from '../../../entity/user/user.entity';

export class CreatePostAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  category: Category;
  @ApiProperty()
  @IsOptional()
  user: User;
}
