import { UserRoleEnum } from '../../../enum/user-role.enum';
import { IsBooleanString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserAdminDto {
  @IsEnum(UserRoleEnum)
  @IsOptional()
  @ApiProperty()
  role: UserRoleEnum;
  @ApiProperty()
  @IsOptional()
  @IsBooleanString()
  isEnabled: boolean;
}
