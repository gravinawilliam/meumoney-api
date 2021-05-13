import { celebrate, Joi, Segments } from 'celebrate';

const createCoinValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    symbol: Joi.string().required(),
  },
});

export default createCoinValidator;
