import User from "../models/user.model.js";
import { checkUniqueFieldUtil } from "../utils/uniqueField.util.js";

export const createUserDb = async (userData) => await User.create(userData);

export const findUserByIdDb = async (id) => await User.findByPk(id);

export const updateUserDb = async (user) =>
  await User.update(user, {
    where: { user_id: user.id },
    returning: true,
});

export const deleteUserDb = async (id) =>
  await User.destroy({
    where: { user_id: id },
});

export const findUserByFieldDb = async (field, value) =>
  await User.findOne({ where: { [field]: value } });

export const checkUniqueFieldDb = async (field, value) =>
  await checkUniqueFieldUtil(field, value, User);
