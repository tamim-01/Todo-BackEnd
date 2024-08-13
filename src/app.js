import express from "express";
import { router as tasksRouter } from "./modules/tasks/routes.js";
import { router as userRouter } from "./modules/users/routes.js";
import { EXPRESS_APP } from "./core/config/index.js";
import { apiLogger, routeNotFound } from "./core/middleware/middlewares.js";
import { authValidationMiddleware } from "./core/middleware/auth-middlewares.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(apiLogger);

app.use("/api/tasks", authValidationMiddleware, tasksRouter);
app.use("/api", userRouter);
app.use(routeNotFound);
const port = EXPRESS_APP.port;
app.listen(port, () => {
  console.log(`todo app runing on port ${port}`);
});
