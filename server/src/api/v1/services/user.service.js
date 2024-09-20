import bcrypt from "bcryptjs";

import {
  checkUniqueFieldDb,
  createUserDb,
  deleteUserDb,
  findUserByIdDb,
  updateUserDb,
} from "../db/user.db.js";
import { generateRandomPassword } from "../utils/passwordGenerator.utils.js";

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

    const password = generateRandomPassword();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    userData.password = hashedPassword;

    const user = await createUserDb(userData);
    return user;
  };

  static findUserById = async (id) => {
    const user = await findUserByIdDb(id);
    return user;
  };

  static updateUser = async (user) => {
    const updatedUser = await updateUserDb(user);
    return updatedUser;
  };

  static deleteUser = async (id) => {
    const user = await deleteUserDb(id);
    return user;
  };
}

export default UserService;
