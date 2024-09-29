import UserService from "./userServices.js";
import {
  authResponseHandler,
  responseHandler,
} from "../utils/responseHandler.js";

// Controller for verifying a user
export const verifyUserContoller = async (req, res, next) => {
  try {
    await UserService.verifyUser(req.validatedUser, next);
    return responseHandler(res, 200, "Successfully Sent Otp");
  } catch (error) {
    next(error);
  }
};

// Controller for creating or registering a user
export const createUserController = async (req, res, next) => {
  try {
    const userData = await UserService.createUser(req.validatedUser, next);
    authResponseHandler(res, 201, "Successfully created user", userData);
  } catch (error) {
    next(error);
  }
};

// Controller for verifying a user
export const verifyRestoreUserContoller = async (req, res, next) => {
  try {
    await UserService.verifyRestoreUser(req.validatedUser, next);
    return responseHandler(res, 200, "Successfully Sent Otp");
  } catch (error) {
    next(error);
  }
};

// Controller for creating or registering a user
export const restoreUserController = async (req, res, next) => {
  try {
    const userData = await UserService.restoreUser(req.validatedUser, next);
    authResponseHandler(res, 201, "Successfully restored user", userData);
  } catch (error) {
    next(error);
  }
};

// Controller for getting user information
export const getUserController = async (req, res, next) => {
  try {
    const userData = await UserService.getUser(req.params.id, next);
    responseHandler(res, 200, "Successfully fetched user", userData);
  } catch (error) {
    next(error);
  }
};

// Controller for updating the user
export const updateUserController = async (req, res, next) => {
  try {
    const user = await UserService.updateUser(req);
    responseHandler(res, 200, "Successfully updated user", user);
  } catch (error) {
    next(error);
  }
};

// Controller for deleting the user
export const deleteUserController = async (req, res, next) => {
  try {
    await UserService.deleteUser(req);
    responseHandler(res, 200, "Successfully deleted user");
  } catch (error) {
    next(error);
  }
};