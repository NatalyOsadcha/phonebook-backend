const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

const validateBody = (schema) => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json(error.message);
    }
    next();
  };
  return fn;
};

module.exports = { validateBody, signupSchema, loginSchema}
