import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaginationDto {
  constructor(limit: number, page: number) {
    this.limit = limit;
    this.page = page;
  }
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ required: false })
  page: number;

  @IsOptional()
  @IsNumber()
  skip: number;
}
