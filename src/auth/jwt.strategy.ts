import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user/user.repository';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { User } from '../entity/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    const username = payload.username;
    const user: User = await this.userService.findUserByEmailOrUsername(
      username,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
