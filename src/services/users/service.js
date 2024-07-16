import {
  getUserById,
  createUser,
  updateUserDataById,
} from "../../models/users/index.js";

async function getUserByIdService(id) {
  const user = await getUserById(id);
  if (!user || user.length <= 0) {
    return null;
  }
  return user[0];
}
async function createUserService(userName, password) {
  const createResult = await createUser(userName, password);
  if (
    createResult["rowCount"] <= 0 ||
    createResult === undefined ||
    createResult === null
  ) {
    return null;
  }
  return createResult;
}

async function updateUserDataByIdService(id, column, value) {
  const updateResult = await updateUserDataById(id, column, value);
  if (
    updateResult["rowCount"] <= 0 ||
    updateResult === undefined ||
    updateResult === null
  ) {
    return null;
  }
  return updateResult;
}
export { getUserByIdService, createUserService, updateUserDataByIdService };
