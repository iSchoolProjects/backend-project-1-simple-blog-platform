import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../entity/user/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';

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

  @ApiBearerAuth()
  @Post('test')
  @UseGuards(JwtAuthGuard)
  test(@GetUser() user) {
    user.toJSON();
    console.log(user);
    return 'OK';
  }
}
