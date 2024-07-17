import express from "express";

import {
  getTaskByIdController,
  getAllTasksController,
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
  getAlltaskByUserIdValidaitor,
  deleteTaskByIdValidator,
  updateTaskByIdValidator,
} from "./validations.js";
const router = express.Router();

//get all tasks
router.get("", getAllTasksController);

//task by id
router.get("/:id", getTaskByIdValidaitor, getTaskByIdController);
router.get(
  "/user/:user_id",
  getAlltaskByUserIdValidaitor,
  getAllTasksByUserIDController
);

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
