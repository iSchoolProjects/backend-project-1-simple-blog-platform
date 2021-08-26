import { Injectable } from '@nestjs/common';
import { CreateFilterDto } from '../dto/create-filter.dto';

@Injectable()
export class FilterService {
  setFilter(filter: CreateFilterDto) {
    const filters = {
      where: {},
      order: {
        createdAt: 'DESC',
      },
    };
    if (!filter.isDeleted) {
      filter.isDeleted = '0';
    }
    // filters.where['isDeleted'] = filter.isDeleted === '1';

    // delete filter.isDeleted;
    for (const key in filter) {
      if (filter[key]) filters.where[key] = filter[key];
    }
    return filters;
  }
}
