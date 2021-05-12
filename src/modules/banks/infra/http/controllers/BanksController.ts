import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateBankService from '@modules/banks/services/CreateBankService';

export default class BanksController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { blueColorCard, greenColorCard, redColorCard, name } = req.body;
    const createBank = container.resolve(CreateBankService);
    const bank = await createBank.execute({
      name,
      blueColorCard,
      greenColorCard,
      redColorCard,
    });
    return res.status(201).json(classToClass(bank));
  }
}
