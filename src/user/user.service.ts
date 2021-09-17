import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user/user.entity';
import { UserRepository } from '../repository/user/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonService } from '../common/services/common.service';
import { UserPhotoRepository } from '../repository/user-photo/user-photo.repository';
import { UserPhoto } from '../entity/user-photo/user-photo.entity';
import { PathUploadEnum } from '../enum/path-upload.enum';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from '../auth/dto/reset-password.dto';
import { ExceptionService } from '../common/services/exception.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    @InjectRepository(UserPhoto)
    private userPhotoRepository: UserPhotoRepository,
    private readonly commonService: CommonService,
    private readonly mailService: MailService,
    private readonly exceptionService: ExceptionService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      let user = new User(createUserDto);

      user = await this.commonService.hashUserPassword(user);

      user = await this.userRepository.save(user);
      await this.mailService.sendWelcomeMail(user);
      return user;
    } catch (e) {
      this.exceptionService.handleError(e);
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
      return await this.userRepository.findOneOrFail({
        where: [
          { username: usernameOrEmail, isEnabled: true },
          { email: usernameOrEmail, isEnabled: true },
        ],
      });
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async uploadFile(file: Express.Multer.File, user: User): Promise<UserPhoto> {
    const photo = new UserPhoto({ image: file.filename, user });
    return await this.userPhotoRepository.save(photo);
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    user: User,
  ): Promise<void> {
    for (const file of files) {
      const photo = new UserPhoto({ image: file.filename, user });
      await this.userPhotoRepository.save(photo);
    }
  }

  async seeUploadedPhoto(imgId: string, user: User): Promise<string> {
    try {
      const userPhoto: UserPhoto = await this.findPhoto(imgId, user.id);
      return `${PathUploadEnum.SERVE_USER_PHOTO}${user.id}/${userPhoto.image}`;
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async setProfilePhoto(id: string, user: User): Promise<UpdateResult> {
    const photo = await this.findPhoto(id, user.id);
    return await this.userRepository.update(user.id, { profilePhoto: photo });
  }

  async findPhoto(id: string, userId: number): Promise<UserPhoto> {
    try {
      return await this.userPhotoRepository.findOneOrFail({
        where: [{ id: id, user: userId }],
      });
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }

  async changeForgottenPassword(
    resetPasswordDto: ResetPasswordDto,
    user: User,
  ): Promise<UpdateResult> {
    try {
      user.password = resetPasswordDto.password;
      const userWithHashedPassword = await this.commonService.hashUserPassword(
        user,
      );
      return this.userRepository.update(user.id, {
        password: userWithHashedPassword.password,
        salt: userWithHashedPassword.salt,
        passwordChangeCounter: user.passwordChangeCounter + 1,
        passwordLastChangeAt: new Date(),
      });
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
