import { celebrate, Joi, Segments } from 'celebrate';

const createBankValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    blueColorCard: Joi.number().min(0).max(255).required(),
    greenColorCard: Joi.number().min(0).max(255).required(),
    redColorCard: Joi.number().min(0).max(255).required(),
  },
});

export default createBankValidator;
