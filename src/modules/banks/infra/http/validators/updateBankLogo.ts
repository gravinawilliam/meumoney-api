import { celebrate, Joi, Segments } from 'celebrate';

const updateBankLogoValidator = celebrate({
  [Segments.QUERY]: {
    bankId: Joi.string().uuid().required(),
  },
});

export default updateBankLogoValidator;
