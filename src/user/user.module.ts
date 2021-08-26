import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user/user.entity';
import { CommonService } from '../common/services/common.service';
import { BlogPost } from '../entity/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, BlogPost])],
  controllers: [UserController],
  providers: [UserService, CommonService],
})
export class UserModule {}
