import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

import userRoutes from "./api/v1/routes/user.routes.js";
import authRoutes from "./api/v1/routes/auth.routes.js";

import { connectDatabase } from "./config/db.connection.js";

const app = express();

connectDatabase();

app.use(express.json());
app.use(cookieParser());

// auth route
app.use("/api/v1/", authRoutes);

// users route
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 3000; // eslint-disable-line no-undef

app.listen(PORT, () => {
  console.log(`Server is listening on the port ${PORT}`);
});
