/* eslint-disable no-console */
import 'reflect-metadata';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import AppError from '../../errors/AppError';
import routes from './routes';
import '../typeorm';
import '../../container';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  console.log(error);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.API_PORT || 3000, () => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(`✅ OK ${process.env.API_PORT || 3000}`);
  }
});
