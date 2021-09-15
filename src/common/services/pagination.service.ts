import { Injectable } from '@nestjs/common';
import { CreatePaginationDto } from '../dto/create-pagination.dto';
import { ExceptionService } from './exception.service';

@Injectable()
export class PaginationService {
  constructor(private readonly exceptionService: ExceptionService) {}
  setPagination(pagination: CreatePaginationDto): CreatePaginationDto {
    try {
      if (!pagination.page || pagination.page === 0)
        pagination.page = Number(process.env.DEFAULT_PAGE);
      pagination.limit =
        pagination.limit || Number(process.env.DEFAULT_PER_PAGE);
      pagination.skip = pagination.limit * (pagination.page - 1);

      return pagination;
    } catch (e) {
      this.exceptionService.handleError(e);
    }
  }
}
