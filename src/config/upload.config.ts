import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';
import dotenv from 'dotenv';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

dotenv.config();

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: multer.StorageEngine;
  };

  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_PROVIDER,

  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        let fileName = `${fileHash}-${file.originalname}`;
        fileName = fileName.replace(/\s/g, '');
        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.AWS_S3_BUCKET,
    },
  },
} as IUploadConfig;
