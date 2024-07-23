import Joi from "joi";

const getUserByIdValidator = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      id: Joi.number().integer().positive().required(),
    });

    const validatedParams = await paramsSchema.validateAsync(req.params);
    req.validatedParams = validatedParams;
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const createUserValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      role: Joi.string(),
    });

    const validatedBody = await bodySchema.validateAsync(req.body);
    req.validatedBody = validatedBody;
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const updateUserDataByIdValidator = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      id: Joi.number().integer().positive().required(),
    });

    const bodySchema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).optional(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .optional(),
    }).min(1);

    const validatedParams = await paramsSchema.validateAsync(req.params);
    const validatedBody = await bodySchema.validateAsync(req.body);

    req.validatedParams = validatedParams;
    req.validatedBody = validatedBody;

    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export {
  getUserByIdValidator,
  createUserValidator,
  updateUserDataByIdValidator,
};
