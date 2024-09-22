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
  validatePassword,
  validateUser,
} from "../validations/user.validations.js";

class UserService {
  static createUser = async (userData) => {
    const validateUserEmail = await checkUniqueFieldDb("email", userData.email);
    if (validateUserEmail) {
      throw validateUserEmail;
    }
    const validateUserPhone = await checkUniqueFieldDb("phone", userData.phone);
    if (validateUserPhone) {
      throw validateUserPhone;
    }

    validateUser(userData);

    const password = generateRandomPassword();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    userData.password = hashedPassword;

    const user = await createUserDb(userData);
    return user;
  };

  static findUserById = async (id) => {
    const user = await findUserByIdDb(id);
    return user;
  };

  static updateUser = async (user) => {
    validateUser(user);
    validatePassword(user.password);
    const updatedUser = await updateUserDb(user);
    return updatedUser;
  };

  static deleteUser = async (id) => {
    const user = await deleteUserDb(id);
    return user;
  };
}

export default UserService;
