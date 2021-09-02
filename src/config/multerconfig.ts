import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import { ConfigModule } from '@nestjs/config';

const setMulterConfig = (dest: string): MulterOptions => {
  ConfigModule.forRoot({ isGlobal: true });
  return {
    storage: diskStorage({
      destination: (req, file, callback) => {
        const path = dest + req.user['id'];
        fs.mkdir(path, () => {});
        callback(null, path);
      },
      filename: (req, file, callback) => {
        const originalName = file.originalname;
        const normalized = originalName.replace(/\s+/g, '-');
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

        const filename = (
          datePart +
          '-' +
          randomPart +
          '-' +
          normalized
        ).toLowerCase();
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new BadRequestException(), false);
      }
      callback(null, true);
    },
    limits: {
      fileSize: parseInt(process.env.MAX_FILE_SIZE),
    },
  };
};

export default setMulterConfig;
