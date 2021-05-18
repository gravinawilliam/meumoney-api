import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTransactionService from '../../../services/CreateTransactionService';

export default class TransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      note,
      title,
      transactionType,
      value,
      fromBankAccountId,
      symbolCoin,
      toBankAccountId,
      date,
    } = req.body;
    const userId = req.user.id;
    const createTransaction = container.resolve(CreateTransactionService);
    const transaction = await createTransaction.execute({
      note,
      date,
      title,
      transactionType,
      value,
      userId,
      fromBankAccountId,
      symbolCoin,
      toBankAccountId,
    });
    return res.json(classToClass(transaction));
  }
}
