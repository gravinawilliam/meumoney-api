import GetValueGainsExpensesByDateBankAccountIdService from '@modules/transactions/services/GetValueGainsExpensesByDateBankAccountIdService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class GetValueGainsExpensesByDateBankAccountIdController {
  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const { bankAccountId, month, year } = req.query;
    const service = container.resolve(
      GetValueGainsExpensesByDateBankAccountIdService,
    );
    const httpResponse = await service.execute({
      bankAccountId: String(bankAccountId),
      year: String(year),
      month: String(month),
      userId,
    });
    return res.json(classToClass(httpResponse));
  }
}
