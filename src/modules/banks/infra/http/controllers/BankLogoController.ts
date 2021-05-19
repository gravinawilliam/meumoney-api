import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { OK } from '@shared/constants/HttpStatusCode';
import UpdateBankLogoService from '@modules/banks/services/UpdateBankLogoService';

export default class BankLogoController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { bankId } = req.query;
    const updateBankLogo = container.resolve(UpdateBankLogoService);
    const httpResponse = await updateBankLogo.execute({
      bankId: String(bankId),
      logo: req.file.filename,
    });
    return res.status(OK).json(classToClass(httpResponse));
  }
}
