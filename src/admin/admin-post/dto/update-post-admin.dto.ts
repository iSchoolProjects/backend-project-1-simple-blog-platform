import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../../entity/category/category.entity';
import { User } from '../../../entity/user/user.entity';
import { PostStatusEnum } from '../../../enum/post-status.enum';

export class UpdatePostAdminDto {
  @IsPositive()
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  category: Category;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  user: User;
  @IsEnum(PostStatusEnum)
  @IsOptional()
  @ApiProperty()
  postStatus: PostStatusEnum;
}
