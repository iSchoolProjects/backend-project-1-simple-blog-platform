import { Module } from '@nestjs/common';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminUserController],
  providers: [AdminUserService],
})
export class AdminUserModule {}
