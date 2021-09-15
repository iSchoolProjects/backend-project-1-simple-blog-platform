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
import { ExceptionService } from '../common/services/exception.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly exceptionService: ExceptionService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.addUser(createUserDto);
  }

  async singIn(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.findUserByEmailOrUsername(
      loginDto.usernameOrEmail,
    );
    try {
      await this.checkPassword(user, loginDto);
      await this.checkIfUserDisabled(user);
      const payload: JwtPayloadInterface = { username: user.username };
      const token: string = this.jwtService.sign(payload);

      return { token };
    } catch (e) {
      this.exceptionService.handleError(e);
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

      await this.checkIfUserExist(checkUser, user);

      const currentTimestamp = Math.round(Date.now() / 1000);
      const expiresAt = checkUser['exp'];

      await this.checkIfJwtTokenExpired(currentTimestamp, expiresAt);

      return this.userService.changeForgottenPassword(resetPasswordDto, user);
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async checkPassword(user: User, loginDto: LoginDto) {
    if ((await bcrypt.hash(loginDto.password, user.salt)) !== user.password) {
      throw new NotFoundException();
    }
  }

  checkIfJwtTokenExpired(currentTimestamp, expiresAt) {
    if (currentTimestamp > expiresAt) throw new BadRequestException();
  }

  checkIfUserExist(checkUser, user) {
    if (checkUser['username'] !== user.username) throw new NotFoundException();
  }

  checkIfUserDisabled(user: User) {
    if (!user.isEnabled)
      throw new UnauthorizedException(
        'You are banned! Please contact support!',
      );
  }
}
