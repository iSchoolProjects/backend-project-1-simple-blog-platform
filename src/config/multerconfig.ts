import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import { ConfigModule } from '@nestjs/config';
import { v4 } from 'uuid';

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

        const filename = (
          getDateNow() +
          '-' +
          v4() +
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

function getDateNow() {
  const dateNow = new Date();
  return (
    dateNow.getFullYear() +
    '-' +
    (dateNow.getMonth() + 1) +
    '-' +
    dateNow.getDate()
  );
}

export default setMulterConfig;
