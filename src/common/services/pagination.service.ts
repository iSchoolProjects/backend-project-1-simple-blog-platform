import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaginationDto } from '../dto/create-pagination.dto';

@Injectable()
export class PaginationService {
  setPagination(pagination: CreatePaginationDto): CreatePaginationDto {
    try {
      if (!pagination.page || pagination.page === 0)
        pagination.page = Number(process.env.DEFAULT_PAGE);
      pagination.limit =
        pagination.limit || Number(process.env.DEFAULT_PER_PAGE);
      pagination.skip = pagination.limit * (pagination.page - 1);

      return pagination;
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
