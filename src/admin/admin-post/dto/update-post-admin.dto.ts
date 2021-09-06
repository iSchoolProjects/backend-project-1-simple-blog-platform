import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../../entity/category/category.entity';
import { User } from '../../../entity/user/user.entity';

export class UpdatePostAdminDto {
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  category: Category;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  user: User;
}
