import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../entity/user/user.entity';

export class CreateFilterDto {
  @IsOptional()
  @IsBooleanString()
  @IsNumberString()
  @ApiProperty({ required: false })
  isDeleted: string;
  @ApiProperty({ required: false })
  @IsOptional()
  user: number;
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  title: string;
}
