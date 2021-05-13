import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateBankService from '@modules/banks/services/CreateBankService';
import ListBanksService from '@modules/banks/services/ListBanksService';
import { CREATED, OK } from '@shared/constants/HttpStatusCode';

export default class BanksController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { blueColorCard, greenColorCard, redColorCard, name } = req.body;
    const createBank = container.resolve(CreateBankService);
    const httpResponse = await createBank.execute({
      name,
      blueColorCard,
      greenColorCard,
      redColorCard,
    });
    return res.status(CREATED).json(classToClass(httpResponse));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listBanks = container.resolve(ListBanksService);
    const httpResponse = await listBanks.execute();
    return res.status(OK).json(classToClass(httpResponse));
  }
}
