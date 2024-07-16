import {
  getTaskByIdService,
  getAllTasksService,
  createTaskService,
  deleteTaskByIdService,
  deleteAllTasksService,
  updateTaskByIdService,
  updateAllTasksService,
  getAllTasksByUserIdService,
} from "../../services/tasks/service.js";

const getTaskByIdController = async (req, res, next) => {
  try {
    const taskID = req.validatedParams.id;
    const task = await getTaskByIdService(taskID);
    if (task === null) {
      res.status(404).json({
        message: `task with id=${taskID} not exist`,
      });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllTasksController = async (req, res) => {
  try {
    const data = await getAllTasksService();
    if (data === null) {
      res
        .status(404)
        .json({ message: "there is no task to show or an error happend" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllTasksByUserIDController = async (req, res) => {
  try {
    const userId = req.validatedParams.user_id;
    const data = await getAllTasksByUserIdService(userId);
    if (data === null) {
      res
        .status(404)
        .json({ message: "there is no task to show or an error happend" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const createTaskController = async (req, res) => {
  try {
    const { user_id, title, description, taskdate } = req.validatedBody;
    const createResult = await createTaskService(
      user_id,
      title,
      description,
      taskdate
    );
    if (createResult === null) {
      res.status(424).json({
        message: `task with title ${title} not created!!`,
      });
    } else {
      res.status(201).json({
        message: `task with title : ${title} is created`,
      });
      console.log(`task with title : ${title} is created`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  getTaskByIdController,
  getAllTasksController,
  getAllTasksByUserIDController,
  createTaskController,
};
