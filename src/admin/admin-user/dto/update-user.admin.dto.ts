import { UserRoleEnum } from '../../../enum/user-role.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserAdminDto {
  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  @ApiProperty()
  role: UserRoleEnum;
}
