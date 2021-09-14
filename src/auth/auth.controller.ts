import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../entity/user/user.entity';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdateResult } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('login')
  async singIn(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return await this.authService.singIn(loginDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('forgot-password/:id/:token')
  resetPassword(
    @Param('id') userId: string,
    @Param('token') token: string,
    @Body()
    resetPasswordDto: ResetPasswordDto,
  ): Promise<UpdateResult> {
    return this.authService.resetPassword(userId, token, resetPasswordDto);
  }
}
