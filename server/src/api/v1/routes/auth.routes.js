import { Router } from "express";
import {
  loginController,
  logoutController,
} from "../controllers/auth.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", loginController);
router.post("/logout", authenticate, logoutController);

export default router;
