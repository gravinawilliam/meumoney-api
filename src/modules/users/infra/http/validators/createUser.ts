import { celebrate, Joi, Segments } from 'celebrate';

const createUserValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
});

export default createUserValidator;
