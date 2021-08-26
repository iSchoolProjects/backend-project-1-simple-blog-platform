import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../entity/category/category.entity';
import { User } from '../../entity/user/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  content: string;
  @ApiProperty()
  @IsNotEmpty()
  category: Category;
  // @ApiProperty()
  // @IsNotEmpty()
  // user: User;
}
