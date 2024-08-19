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

const createTaskValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
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

const deleteTaskByIdValidator = async (req, res, next) => {
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
const updateTaskByIdValidator = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      id: Joi.number().integer().positive().required(),
    });

    const bodySchema = Joi.object({
      title: Joi.string().min(1).max(100).optional(),
      description: Joi.string().allow("").max(500).optional(),
      is_completed: Joi.boolean().optional(),
      taskdate: Joi.date().iso().optional(), // Added taskdate validation
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
  createTaskValidator,
  getTaskByIdValidaitor,
  deleteTaskByIdValidator,
  updateTaskByIdValidator,
};
