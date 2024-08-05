import express from "express";
import {
  getUSerByIdController,
  createUserController,
  updateUserDataByIdController,
  loginUserController,
} from "./controllers.js";

import {
  createUserValidator,
  updateUserDataByIdValidator,
} from "./validations.js";
import { authValidationMiddleware } from "../../core/middleware/auth-middlewares.js";

const router = express.Router();

router.get("/user", authValidationMiddleware, getUSerByIdController);

router.post("/signup", createUserValidator, createUserController);
router.post("/signin", loginUserController);

router.put(
  "/user",
  authValidationMiddleware,
  updateUserDataByIdValidator,
  updateUserDataByIdController
);

export { router };
