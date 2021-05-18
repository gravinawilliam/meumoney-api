import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CREATED } from '@shared/constants/HttpStatusCode';
import CreateBankAccountService from '@modules/bankAccounts/services/CreateBankAccountService';

export default class BankAccountsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      accountNumbers,
      balance,
      bankId,
      cardholderName,
      monthValidity,
      symbolCoin,
      yearValidity,
    } = req.body;
    const userId = req.user.id;
    const createBankAccount = container.resolve(CreateBankAccountService);
    const httpResponse = await createBankAccount.execute({
      accountNumbers,
      balance,
      bankId,
      cardholderName,
      monthValidity,
      symbolCoin,
      userId,
      yearValidity,
    });
    return res.status(CREATED).json(classToClass(httpResponse));
  }
}
