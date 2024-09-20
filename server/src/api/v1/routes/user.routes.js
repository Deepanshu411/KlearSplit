import { Router } from "express";

import {
  createUserController,
  deleteUser,
  getUserByIdController,
  updateUserController,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", createUserController);
router.get("/:id", getUserByIdController);
router.patch("/:id", updateUserController);
router.delete("/:id", deleteUser);

export default router;
