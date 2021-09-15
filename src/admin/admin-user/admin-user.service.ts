import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user/user.entity';
import { UserRepository } from '../../repository/user/user.repository';
import { UpdateUserAdminDto } from './dto/update-user.admin.dto';
import { UpdateResult } from 'typeorm';
import { ExceptionService } from '../../common/services/exception.service';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionService,
  ) {}
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async getOneUser(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async editUser(
    id: string,
    updateUserAdmin: UpdateUserAdminDto,
  ): Promise<UpdateResult> {
    try {
      return await this.userRepository.update(id, updateUserAdmin);
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }
}
