import {
  getTaskById,
  createTask,
  deleteTaskById,
  deleteAllTasks,
  updateTaskById,
  updateAllTasks,
  getTasksByUserId,
} from "../../models/tasks/index.js";

async function getTaskByIdService(id, userId) {
  const task = await getTaskById(id, userId);
  if (!task || task.length <= 0) {
    return null;
  }
  return task[0];
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
async function deleteTaskByIdService(id, userId) {
  const deleteResult = await deleteTaskById(id, userId);
  if (
    deleteResult["rowCount"] <= 0 ||
    deleteResult === undefined ||
    deleteResult === null
  ) {
    return null;
  }
  return deleteResult;
}
async function deleteAllTasksService(userId) {
  const deleteResult = await deleteAllTasks(userId);
  if (
    deleteResult["rowCount"] <= 0 ||
    deleteResult === undefined ||
    deleteResult === null
  ) {
    return null;
  }
  return deleteResult;
}
async function updateTaskByIdService(userId, id, column, value) {
  const updateResult = await updateTaskById(userId, id, column, value);
  if (
    updateResult["rowCount"] <= 0 ||
    updateResult === undefined ||
    updateResult === null
  ) {
    return null;
  }
  return updateResult;
}
async function updateAllTasksService(userId, column, value) {
  const updateResult = await updateAllTasks(userId, column, value);
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
  createTaskService,
  deleteTaskByIdService,
  deleteAllTasksService,
  updateTaskByIdService,
  updateAllTasksService,
  getAllTasksByUserIdService,
};
