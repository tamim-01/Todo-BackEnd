import Joi from "joi";
const getTaskByIdValidaitor = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      id: Joi.number().required(),
    }).required();

    const validationParams = await paramsSchema.validateAsync(req.params);
    req.validatedParams = validationParams;

    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const getAlltaskByUserIdValidaitor = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      user_id: Joi.number().required(),
    }).required();

    const validationParams = await paramsSchema.validateAsync(req.params);
    req.validatedParams = validationParams;

    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const createTaskValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      user_id: Joi.number().integer().positive().required(),
      title: Joi.string().required().trim().max(255),
      description: Joi.string().allow("").max(1000),
      taskdate: Joi.string()
        .required()
        .custom((value, helpers) => {
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(value)) {
            return helpers.error("date.format");
          }
          const date = new Date(value);
          if (isNaN(date.getTime())) {
            return helpers.error("date.invalid");
          }
          return value;
        }, "Date validation"),
    }).required();

    const validationBody = await bodySchema.validateAsync(req.body);
    req.validatedBody = validationBody;

    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export {
  getAlltaskByUserIdValidaitor,
  createTaskValidator,
  getTaskByIdValidaitor,
};
