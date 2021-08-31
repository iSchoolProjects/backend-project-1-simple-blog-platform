import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user/user.entity';
import { UserRepository } from '../../repository/user/user.repository';
import { UpdateUserAdminDto } from './dto/update-user.admin.dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getOneUser(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async editUser(
    id: string,
    updateUserAdmin: UpdateUserAdminDto,
  ): Promise<UpdateResult> {
    try {
      return await this.userRepository.update(id, updateUserAdmin);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
