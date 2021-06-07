import { celebrate, Joi, Segments } from 'celebrate';

const deleteBankAccountValidator = celebrate({
  [Segments.PARAMS]: {
    bankAccountId: Joi.string().uuid().required(),
  },
});

export default deleteBankAccountValidator;
