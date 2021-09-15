import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
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
  @Min(0)
  page: number;

  @IsOptional()
  @IsNumber()
  skip: number;
}
