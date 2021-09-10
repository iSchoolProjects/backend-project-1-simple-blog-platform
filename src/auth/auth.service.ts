import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../entity/user/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailService } from '../mail/mail.service';
import { UpdateResult } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly mailService: MailService,
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

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const getUserByEmail = await this.userService.findUserByEmailOrUsername(
      forgotPasswordDto.usernameOrEmail,
    );
    if (!getUserByEmail) throw new NotFoundException();
    const token = this.jwtService.sign(
      { username: getUserByEmail.username },
      {
        secret: process.env.JWT_SECRET_FOR_PASSWORD_RESET,
        expiresIn: parseInt(process.env.JWT_TOKEN_RESET_PASSWORD_EXPIRES),
      },
    );

    await this.mailService.sendMailForNewPassword(
      getUserByEmail.email,
      token,
      getUserByEmail.username,
    );
  }

  async resetPassword(
    id: string,
    token: string,
    resetPasswordDto: ResetPasswordDto,
  ): Promise<UpdateResult> {
    try {
      const user = await this.userService.findOne(id);
      const checkUser = await this.jwtService.decode(token);
      if (checkUser['username'] !== user.username) throw new Error();

      const currentTimestamp = Math.round(Date.now() / 1000);
      const expiresAt = checkUser['exp'];

      if (currentTimestamp > expiresAt) throw new Error();

      return this.userService.changeForgottenPassword(resetPasswordDto, user);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
