import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilterDto {
  @IsOptional()
  @IsBooleanString()
  @IsNumberString()
  @ApiProperty({ required: false })
  isDeleted: string;
  @IsOptional()
  @ApiProperty({ required: false })
  user: number;
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  title: string;
}
