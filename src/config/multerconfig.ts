import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { Request } from 'express';

const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename(
      req: Request,
      file: Express.Multer.File,
      callback: (error: Error | null, filename: string) => void,
    ) {
      callback(null, file.originalname);
    },
  }),
};

export default multerConfig;
