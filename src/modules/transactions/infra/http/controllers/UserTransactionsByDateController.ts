import ListTransactionByDateUserIdService from '@modules/transactions/services/ListTransactionByDateUserIdService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserTransactionsByDateController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { date } = req.query;
    const userId = req.user.id;
    const listTransactionByDateUserId = container.resolve(
      ListTransactionByDateUserIdService,
    );
    const transactions = await listTransactionByDateUserId.execute({
      date: String(date),
      userId,
    });
    return res.json(classToClass(transactions));
  }
}
