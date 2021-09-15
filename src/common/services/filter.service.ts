import { Injectable } from '@nestjs/common';
import { CreateFilterDto } from '../dto/create-filter.dto';

@Injectable()
export class FilterService {
  setFilter(filter: CreateFilterDto) {
    const filters = {};
    if (!filter.isDeleted) {
      filter.isDeleted = '0';
    }

    if (filter.user == 0) {
      filter.user = null;
    }

    for (const key in filter) {
      if (filter[key] || filter[key] === null) filters[key] = filter[key];
    }
    return filters;
  }
}
