import { CreatePostAdminDto } from './create-post-admin.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostsAdminDto {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostAdminDto)
  posts: CreatePostAdminDto[];
}
