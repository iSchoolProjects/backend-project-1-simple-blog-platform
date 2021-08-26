import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user/user.entity';
import { UserRepository } from '../repository/user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonService } from '../common/services/common.service';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private readonly commonService: CommonService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (e) {
      return e.message;
    }
  }

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUserCheck = await this.userRepository.find({
        username: createUserDto.username,
      });

      if (existingUserCheck.length) throw new ConflictException();
      let user = new User(createUserDto);

      user = await this.commonService.hashUserPassword(user);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        //duplicate username or email
        throw new ConflictException('Username or email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async editUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    let user = new User(updateUserDto);

    user = await this.commonService.hashUserPassword(user);

    return await this.userRepository.update(id, user);
  }

  async findUserByEmailOrUsername(usernameOrEmail: string): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });

      return user;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}