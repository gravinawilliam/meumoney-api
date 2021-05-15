import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CREATED, OK } from '@shared/constants/HttpStatusCode';
import CreateCoinService from '@modules/coins/services/CreateCoinService';
import ListCoinsService from '@modules/coins/services/ListCoinsService';

export default class CoinsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createCoin = container.resolve(CreateCoinService);
    const httpResponse = await createCoin.execute();
    return res.status(CREATED).json(classToClass(httpResponse));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listCoins = container.resolve(ListCoinsService);
    const httpResponse = await listCoins.execute({
      amountCoins: 9,
    });
    return res.status(OK).json(classToClass(httpResponse));
  }
}
