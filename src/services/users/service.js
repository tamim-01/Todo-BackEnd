import {
  getUserById,
  createUser,
  updateUserDataById,
  getUserByUSerName,
} from "../../models/users/index.js";
import { hash, validateHash } from "../../core/utils/encryption/index.js";
import { jwtSign } from "../../core/auth/jwt-auth.js";
async function getUserByIdService(id) {
  const user = await getUserById(id);
  if (!user || user.length <= 0) {
    return null;
  }
  return user[0];
}
async function createUserService(userName, password, role) {
  const encryptedPassword = await hash(password);
  const createResult = await createUser(userName, encryptedPassword, role);
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
async function validateUserLoginService(userName, password) {
  const user = await getUserByUSerName(userName);
  if (!user) {
    throw new Error("Username or Password is not correct.");
  }

  const validatedHash = await validateHash(password, user.password);
  if (!validatedHash) {
    throw new Error("Username or Password is not correct.");
  }
  const jwtUSerData = {
    id: user.user_id,
    username: user.username,
    role: user.role,
  };
  const userJwt = jwtSign(jwtUSerData);
  return userJwt;
}
export {
  getUserByIdService,
  createUserService,
  updateUserDataByIdService,
  validateUserLoginService,
};
