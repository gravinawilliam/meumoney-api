import dotenv from 'dotenv';

dotenv.config();

export default {
  jwt: {
    secret:
      process.env.JWT_APP_SECRET !== undefined
        ? process.env.JWT_APP_SECRET
        : '123',
    expiresIn:
      process.env.JWT_EXPIRES_IN !== undefined
        ? process.env.JWT_EXPIRES_IN
        : '99d',
  },
};
