import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ExceptionService {
  handleError(error: any) {
    if (error.name.includes('EntityNotFoundError'))
      throw new NotFoundException();
    switch (error.code) {
      case 'ER_DUP_ENTRY':
        throw new ConflictException();
      case 'WARN_DATA_TRUNCATED':
        throw new ConflictException();
      case 'ER_NO_REFERENCED_ROW_2':
        throw new NotFoundException();
      default:
        throw new BadRequestException();
    }
  }
}
