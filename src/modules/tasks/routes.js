import express from "express";

import {
  getTaskByIdController,
  createTaskController,
  getAllTasksByUserIDController,
  deleteTaskByIdController,
  deleteAllTasksController,
  updateTaskByIdController,
  updateAllTasksAsCompletedController,
} from "./controllers.js";
import {
  getTaskByIdValidaitor,
  createTaskValidator,
  deleteTaskByIdValidator,
  updateTaskByIdValidator,
} from "./validations.js";
const router = express.Router();

//get all tasks by user id
router.get("", getAllTasksByUserIDController);

//task by id
router.get("/:id", getTaskByIdValidaitor, getTaskByIdController);

//create task
router.post("", createTaskValidator, createTaskController);

//delete task by id
router.delete("/:id", deleteTaskByIdValidator, deleteTaskByIdController);

//delete all tasks
router.delete("", deleteAllTasksController);

//update task by id
router.put("/:id", updateTaskByIdValidator, updateTaskByIdController);

//update all tasks as complated
router.put("", updateAllTasksAsCompletedController);

export { router };
