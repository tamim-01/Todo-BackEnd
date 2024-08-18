import {
  getTaskByIdService,
  createTaskService,
  deleteTaskByIdService,
  deleteAllTasksService,
  updateTaskByIdService,
  updateAllTasksService,
  getAllTasksByUserIdService,
} from "../../services/tasks/service.js";

const getTaskByIdController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const taskID = req.validatedParams.id;
    const task = await getTaskByIdService(taskID, userId);
    if (task === null) {
      res.status(404).json({
        message: `task with id=${taskID} from user=${userId} not exist`,
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

const getAllTasksByUserIDController = async (req, res) => {
  try {
    const userId = req.user.id;
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
    const user_id = req.user.id;
    const { title, description, taskdate } = req.validatedBody;

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

const deleteTaskByIdController = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskID = req.validatedParams.id;
    const deleteResult = await deleteTaskByIdService(taskID, userId);
    if (deleteResult === null) {
      res.status(424).json({
        message: `task with id=${taskID} not deleted!!`,
      });
    } else {
      res.status(201).json({
        message: `task with id=${taskID} is deleted`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteAllTasksController = async (req, res) => {
  try {
    const userId = req.user.id;
    const deleteResult = await deleteAllTasksService(userId);
    if (deleteResult === null) {
      res.status(424).json({
        message: `there is no task to delete`,
      });
    } else {
      res.status(201).json({
        message: `${deleteResult["rowCount"]} rows of tasks deleted successfully`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateTaskByIdController = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskID = req.validatedParams.id;
    const updateList = req.validatedBody;
    const columns = Object.keys(updateList);
    let allUpdatesSuccessful = true;

    for (const column of columns) {
      const updateResult = await updateTaskByIdService(
        userId,
        taskID,
        column,
        updateList[column]
      );

      if (updateResult === null) {
        allUpdatesSuccessful = false;
        break;
      }
    }

    if (allUpdatesSuccessful) {
      res.status(200).json({
        message: `Task with id=${taskID} has been updated successfully.`,
      });
      console.log(`Task with id=${taskID} has been updated successfully.`);
    } else {
      res.status(400).json({
        message: `Failed to update task with id=${taskID}.`,
      });
      console.log(`Failed to update task with id=${taskID}.`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `error.message`,
    });
  }
};
const updateAllTasksAsCompletedController = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateResult = await updateAllTasksService(
      userId,
      "is_completed",
      true
    );
    if (updateResult === null) {
      res.status(424).json({
        message: `there is no task to update`,
      });
    } else {
      res.status(201).json({
        message: `${updateResult["rowCount"]} rows of tasks updated to is completed successfully`,
      });
      console.log(
        `${updateResult["rowCount"]} rows of tasks updated to is completed successfully`
      );
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
  getAllTasksByUserIDController,
  createTaskController,
  deleteTaskByIdController,
  deleteAllTasksController,
  updateTaskByIdController,
  updateAllTasksAsCompletedController,
};
