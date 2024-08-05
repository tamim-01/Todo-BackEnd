import {
  getUserByIdService,
  createUserService,
  updateUserDataByIdService,
  validateUserLoginService,
} from "../../services/users/service.js";
import { hash, validateHash } from "../../core/utils/encryption/index.js";
const getUSerByIdController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await getUserByIdService(userId);
    if (user === null) {
      res.status(404).json({
        message: `user with id=${userId} not exist`,
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const createUserController = async (req, res) => {
  try {
    const { username, password, role } = req.validatedBody;
    const createResult = await createUserService(username, password, role);
    if (createResult === null) {
      res.status(424).json({
        message: `user with name ${username} not created!!`,
      });
    } else {
      res.status(201).json({
        message: `user with Name : ${username} is created`,
      });
      console.log(`user with Name : ${username} is created`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateUserDataByIdController = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateList = req.validatedBody;
    const columns = Object.keys(updateList);
    let allUpdatesSuccessful = true;

    for (const column of columns) {
      if (column == "password") {
        const encryptedPassword = await hash(updateList[column]);

        const updateResult = await updateUserDataByIdService(
          userId,
          column,
          encryptedPassword
        );

        if (updateResult === null) {
          allUpdatesSuccessful = false;
          break;
        }
      } else {
        const updateResult = await updateUserDataByIdService(
          userId,
          column,
          updateList[column]
        );

        if (updateResult === null) {
          allUpdatesSuccessful = false;
          break;
        }
      }
    }

    if (allUpdatesSuccessful) {
      res.status(200).json({
        message: `user with id=${userId} has been updated successfully.`,
      });
      console.log(`user with id=${userId} has been updated successfully.`);
    } else {
      res.status(400).json({
        message: `Failed to update user with id=${userId}.`,
      });
      console.log(`Failed to update user with id=${userId}.`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const loginUserController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const jwt = await validateUserLoginService(username, password);
    res.status(200).json({ jwt: jwt });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: error.message,
    });
  }
};
export {
  getUSerByIdController,
  createUserController,
  updateUserDataByIdController,
  loginUserController,
};
