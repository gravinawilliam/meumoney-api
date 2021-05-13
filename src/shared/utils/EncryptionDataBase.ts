import { EncryptionTransformer } from 'typeorm-encrypted';

import dotenv from 'dotenv';

dotenv.config();

const EncryptionDataBase = new EncryptionTransformer({
  key: `${process.env.TYPEORM_KEY_ENCRYPT}`,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
  iv: `${process.env.TYPEORM_IV_ENCRYPT}`,
});

export default EncryptionDataBase;
