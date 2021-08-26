import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsString()
  @ApiProperty()
  @MinLength(8)
  @MaxLength(32)
  password: string;
  @IsEmail()
  @ApiProperty()
  email: string;
}
