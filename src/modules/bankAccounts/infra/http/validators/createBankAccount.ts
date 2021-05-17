import { celebrate, Joi, Segments } from 'celebrate';

const createBankAccountValidator = celebrate({
  [Segments.BODY]: {
    accountNumbers: Joi.string().required(),
    balance: Joi.number().required(),
    cardholderName: Joi.string().required(),
    monthValidity: Joi.number().min(1).max(12).required(),
    yearValidity: Joi.number().min(10).max(99).required(),
    bankId: Joi.string().uuid().required(),
    symbolCoin: Joi.string().required(),
  },
});

export default createBankAccountValidator;
