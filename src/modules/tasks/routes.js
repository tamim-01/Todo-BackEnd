import express from "express";

import {
  getTaskByIdController,
  getAllTasksController,
  createTaskController,
  getAllTasksByUserIDController,
} from "./controllers.js";
import {
  getTaskByIdValidaitor,
  createTaskValidator,
  getAlltaskByUserIdValidaitor,
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

export { router };
