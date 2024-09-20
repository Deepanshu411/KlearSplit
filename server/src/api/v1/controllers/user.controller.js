import UserService from "../services/user.service.js";

export const createUserController = async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body;

    const user = await UserService.createUser({
      first_name,
      last_name,
      email,
      phone,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.errors[0].message });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await UserService.updateUser({ ...req.body, id });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
