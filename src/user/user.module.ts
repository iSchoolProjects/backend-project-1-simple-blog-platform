import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user/user.entity';
import { CommonService } from '../common/services/common.service';
import { BlogPost } from '../entity/post/post.entity';
import { UserPhoto } from '../entity/user-photo/user-photo.entity';
import { UserPhotoRepository } from '../repository/user-photo/user-photo.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserPhotoRepository, UserPhoto, BlogPost]),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [UserController],
  providers: [UserService, CommonService],
})
export class UserModule {}
