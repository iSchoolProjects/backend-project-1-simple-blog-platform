import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRoleEnum } from '../../enum/user-role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === UserRoleEnum.ADMIN) {
      return true;
    }
    return false;
  }
}
