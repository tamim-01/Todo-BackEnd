import express from "express";
import {
  getUSerByIdController,
  createUserController,
  updateUserDataByIdController,
  loginUserController,
} from "./controllers.js";

import {
  getUserByIdValidator,
  createUserValidator,
  updateUserDataByIdValidator,
} from "./validations.js";

const router = express.Router();

router.get("/user/:id", getUserByIdValidator, getUSerByIdController);

router.post("/signup", createUserValidator, createUserController);
router.post("/signin", loginUserController);

router.put(
  "/user/:id",
  updateUserDataByIdValidator,
  updateUserDataByIdController
);

export { router };
