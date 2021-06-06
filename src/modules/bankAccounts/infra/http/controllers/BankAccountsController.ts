import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CREATED, OK } from '@shared/constants/HttpStatusCode';
import CreateBankAccountService from '@modules/bankAccounts/services/CreateBankAccountService';
import ListBankAccountsByUserIdService from '@modules/bankAccounts/services/ListBankAccountsByUserIdService';

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

  public async index(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const listBankAccountsByUserId = container.resolve(
      ListBankAccountsByUserIdService,
    );
    const httpResponse = await listBankAccountsByUserId.execute({
      userId,
    });
    return res.status(OK).json(classToClass(httpResponse));
  }
}
