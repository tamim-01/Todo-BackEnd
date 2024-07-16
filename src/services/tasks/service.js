import {
  getTasks,
  getTaskById,
  createTask,
  deleteTaskById,
  deleteAllTasks,
  updateTaskById,
  updateAllTasks,
  getTasksByUserId,
} from "../../models/tasks/index.js";

async function getTaskByIdService(id) {
  const task = await getTaskById(id);
  if (!task || task.length <= 0) {
    return null;
  }
  return task[0];
}
async function getAllTasksService() {
  const tasks = await getTasks();
  if (tasks.length <= 0 || tasks === null || tasks === undefined) {
    return null;
  }
  return tasks;
}
async function getAllTasksByUserIdService(userId) {
  const tasks = await getTasksByUserId(userId);
  if (tasks.length <= 0 || tasks === null || tasks === undefined) {
    return null;
  }
  return tasks;
}

async function createTaskService(userId, title, description, taskdate) {
  const createResult = await createTask(userId, title, description, taskdate);
  if (
    createResult["rowCount"] <= 0 ||
    createResult === undefined ||
    createResult === null
  ) {
    return null;
  }
  return createResult;
}
async function deleteTaskByIdService(id) {
  const deleteResult = await deleteTaskById(id);
  if (
    deleteResult["rowCount"] <= 0 ||
    deleteResult === undefined ||
    deleteResult === null
  ) {
    return null;
  }
  return deleteResult;
}
async function deleteAllTasksService() {
  const deleteResult = await deleteAllTasks();
  if (
    deleteResult["rowCount"] <= 0 ||
    deleteResult === undefined ||
    deleteResult === null
  ) {
    return null;
  }
  return deleteResult;
}
async function updateTaskByIdService(id, column, value) {
  const updateResult = await updateTaskById(id, column, value);
  if (
    updateResult["rowCount"] <= 0 ||
    updateResult === undefined ||
    updateResult === null
  ) {
    return null;
  }
  return updateResult;
}
async function updateAllTasksService(column, value) {
  const updateResult = await updateAllTasks(column, value);
  if (
    updateResult["rowCount"] <= 0 ||
    updateResult === undefined ||
    updateResult === null
  ) {
    return null;
  }
  return updateResult;
}
export {
  getTaskByIdService,
  getAllTasksService,
  createTaskService,
  deleteTaskByIdService,
  deleteAllTasksService,
  updateTaskByIdService,
  updateAllTasksService,
  getAllTasksByUserIdService,
};
