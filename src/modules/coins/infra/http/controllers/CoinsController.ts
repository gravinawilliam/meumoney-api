import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CREATED } from '@shared/constants/HttpStatusCode';
import CreateCoinService from '@modules/coins/services/CreateCoinService';

export default class CoinsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { symbol, name } = req.body;
    const createBank = container.resolve(CreateCoinService);
    const httpResponse = await createBank.execute({
      name,
      symbol,
    });
    return res.status(CREATED).json(classToClass(httpResponse));
  }
}
