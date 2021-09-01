import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const originalName: string = file.originalname;
      let normalized = originalName.replace(/\s+/g, '-');
      normalized = normalized.replace(/[^A-z0-9\.\-]/g, '');
      const dateNow = new Date();
      const datePart =
        dateNow.getFullYear() +
        '-' +
        (dateNow.getMonth() + 1) +
        '-' +
        dateNow.getDate();

      const randomPart: string = new Array(10)
        .fill(0)
        .map((e) => (Math.random() * 9).toFixed(0).toString())
        .join('');

      let fileName = datePart + '-' + randomPart + '-' + normalized;
      fileName = fileName.toLowerCase();
      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new BadRequestException(), false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024, //Number(process.env.MAX_FILE_SIZE),
  },
};
export default multerConfig;
