import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../entity/user/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.addUser(createUserDto);
  }

  async singIn(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.findUserByEmailOrUsername(
      loginDto.usernameOrEmail,
    );
    try {
      if (
        user &&
        (await bcrypt.hash(loginDto.password, user.salt)) === user.password
      ) {
        const payload: JwtPayloadInterface = { username: user.username };
        const token: string = this.jwtService.sign(payload);

        return { token };
      } else {
        throw new UnauthorizedException();
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
