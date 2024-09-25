import UserService from "./userServices.js";
import { authResponseHandler, responseHandler } from "../utils/responseHandler.js";

// Controller for creating or registering a user
export const createUserController = async (req, res, next) => {
  try {
    const userData = await UserService.createUser(req.body, next);
    authResponseHandler(res, 201, "Successfully created user", userData)
  } catch (error) {
    next(error);
  }
};

// Controller for getting user information
export const getUserController = async (req, res, next) => {
  try {
    const userData = await UserService.getUser(req.params.id, next);
    responseHandler(res, 200, "Successfully fetched user", userData)
  } catch (error) {
    next(error);
  }
};

// Controller for updating the user
export const updateUserController = async (req, res, next) => {
  try {
    const user = await UserService.updateUser(req, next);
    responseHandler(res, 200, "Successfully updated user", user)
  } catch (error) {
    next(error);
  }
};

// Controller for deleting the user
export const deleteUserController = async (req, res, next) => {
  try {
    await UserService.deleteUser(req, next);
    responseHandler(res, 200, "Successfully deleted user")
  } catch (error) {
    next(error);
  }
};
