import { User } from '../../../entity/user/user.entity';
import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostsAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  ids: number[];
  @ApiProperty()
  @IsNotEmpty()
  user: User;
}
