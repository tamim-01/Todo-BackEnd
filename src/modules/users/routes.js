import express from "express";
import {
  getUSerByIdController,
  createUserController,
  updateUserDataByIdController,
} from "./controllers.js";

import {
  getUserByIdValidator,
  createUserValidator,
  updateUserDataByIdValidator,
} from "./validations.js";

const router = express.Router();

router.get("/:id", getUserByIdValidator, getUSerByIdController);

router.post("", createUserValidator, createUserController);

router.put("/:id", updateUserDataByIdValidator, updateUserDataByIdController);

export { router };
