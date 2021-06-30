import DeleteTransactionService from '@modules/transactions/services/DeleteTransactionService';
import ListTransactionsByBankAccountIdService from '@modules/transactions/services/ListTransactionsByBankAccountIdService';
import ListTransactionsByMonthYearBankAccountIdService from '@modules/transactions/services/ListTransactionsByMonthYearBankAccountIdService';
import UpdateTransactionService from '@modules/transactions/services/UpdateTransactionService';
import { OK } from '@shared/constants/HttpStatusCode';
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

  public async update(req: Request, res: Response): Promise<Response> {
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
    const { transactionId } = req.params;
    const updateTransaction = container.resolve(UpdateTransactionService);
    const httpResponse = await updateTransaction.execute({
      note,
      date,
      title,
      transactionType,
      value,
      userId,
      fromBankAccountId,
      symbolCoin,
      toBankAccountId,
      transactionId,
    });
    return res.json(classToClass(httpResponse));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { transactionId } = req.params;
    const userId = req.user.id;
    const deleteTransaction = container.resolve(DeleteTransactionService);
    const transaction = await deleteTransaction.execute({
      transactionId,
      userId,
    });
    return res.status(OK).json(classToClass(transaction));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { month, year } = req.query;
    const service = container.resolve(
      ListTransactionsByMonthYearBankAccountIdService,
    );
    const transactions = await service.execute({
      year: String(year),
      month: String(month),
      userId,
    });
    return res.status(OK).json(classToClass(transactions));
  }

  public async listByBankAccount(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const userId = req.user.id;
    const { bankAccountId } = req.params;
    const service = container.resolve(ListTransactionsByBankAccountIdService);
    const transactions = await service.execute({
      bankAccountId: String(bankAccountId),
      userId,
    });
    return res.status(OK).json(classToClass(transactions));
  }
}
