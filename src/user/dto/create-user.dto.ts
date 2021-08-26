import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
}
