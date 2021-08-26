import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(36)
  usernameOrEmail: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
