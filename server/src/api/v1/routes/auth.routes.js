import { Router } from "express";
import { loginController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", loginController);

export default router;