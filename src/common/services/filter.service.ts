import { Injectable } from '@nestjs/common';
import { CreateFilterDto } from '../dto/create-filter.dto';
import { User } from '../../entity/user/user.entity';
import { UserRoleEnum } from '../../enum/user-role.enum';

@Injectable()
export class FilterService {
  setFilter(filter: CreateFilterDto, user: User) {
    const filters = {
      where: {},
      order: {
        createdAt: 'DESC',
      },
    };
    if (!filter.isDeleted) {
      filter.isDeleted = '0';
    }

    if (filter.user == 0) {
      filter.user = null;
    }

    // filters.where['isDeleted'] = filter.isDeleted === '1';

    // delete filter.isDeleted;

    for (const key in filter) {
      if (filter[key] || filter[key] === null) filters.where[key] = filter[key];
    }

    if (user.role === UserRoleEnum.USER) {
      filters.where = [{ user: user.id }, { user: null }];
    }

    return filters;
  }
}
