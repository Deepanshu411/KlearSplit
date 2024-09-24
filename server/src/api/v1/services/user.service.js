import bcrypt from "bcryptjs";

import {
  checkUniqueFieldDb,
  createUserDb,
  deleteUserDb,
  findUserByIdDb,
  updateUserDb,
} from "../db/user.db.js";
import { generateRandomPassword } from "../utils/passwordGenerator.util.js";
import {
  createUserValidation,
  updateUserValidation,
} from "../validations/user.validations.js";
import TokenService from "./token.service.js";

class UserService {
  static createUser = async (res, userData) => {
    console.log(userData , userData.email)
    const validateUserEmail = await checkUniqueFieldDb("email", userData.email);
   
    if (validateUserEmail) {
      throw validateUserEmail;
    }
    const validateUserPhone = await checkUniqueFieldDb("phone", userData.phone);
    if (validateUserPhone) {
      throw validateUserPhone;
    }

    createUserValidation(userData);

    const password = generateRandomPassword();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    userData.password = hashedPassword;

    
    const user = await createUserDb(userData);

    const { accessToken, refreshToken } =
      await TokenService.generateTokens(user);

    const access_token = TokenService.setAccessTokenInLocalStorage(res, accessToken);
    TokenService.setTokensInCookies(res, refreshToken);
    return { ...user, access_token };
  };

  static findUserById = async (id) => {
    const user = await findUserByIdDb(id);
    return user;
  };

  static updateUser = async (user) => {
    updateUserValidation(user);
    const updatedUser = await updateUserDb(user);
    return updatedUser;
  };

  static deleteUser = async (id) => {
    const user = await deleteUserDb(id);
    return user;
  };
}

export default UserService;
