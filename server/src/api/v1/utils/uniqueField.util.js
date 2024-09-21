export const checkUniqueFieldUtil = async (field, value, model) => {
  const existingUser = await model.findOne({ where: { [field]: value } });
  if (existingUser) {
    const error = new Error(`User with this ${field} already exists`);
    error.errors = [{ message: `User with this ${field} already exists` }];
    return error;
  }
};
