import { Router } from "express";

import {
  createUserController,
  deleteUser,
  getUserByIdController,
  updateUserController,
} from "../controllers/user.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = Router();

// Unprotected routes
router.post("/register", createUserController);

// Protected routes
router.get("/:id", authenticate, getUserByIdController);
router.patch("/:id", authenticate, updateUserController);
router.delete("/:id", authenticate, deleteUser);

export default router;
