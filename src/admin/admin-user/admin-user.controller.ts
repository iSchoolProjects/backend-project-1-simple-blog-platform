import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminUserService } from './admin-user.service';
import { UpdateUserAdminDto } from './dto/update-user.admin.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { User } from '../../entity/user/user.entity';
import { UpdateResult } from 'typeorm';
import { SuperAdminGuard } from '../../auth/guards/super-admin.guard';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.adminUserService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string): Promise<User> {
    return this.adminUserService.getOneUser(id);
  }

  @UseGuards(SuperAdminGuard)
  @Put(':id')
  editUser(
    @Param('id') id: string,
    @Body() updateUserAdmin: UpdateUserAdminDto,
  ): Promise<UpdateResult> {
    return this.adminUserService.editUser(id, updateUserAdmin);
  }
}
