import { celebrate, Joi, Segments } from 'celebrate';

const forgotPasswordValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().trim().required(),
  },
});

export default forgotPasswordValidator;
