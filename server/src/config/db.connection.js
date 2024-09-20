import { Sequelize } from "sequelize";

import {
  dialect,
  host,
  username,
  password,
  database,
  port,
} from "./db.config.js";

export const sequelize = new Sequelize({
  dialect,
  host,
  username,
  password,
  database,
  port,
  logging: false,
});

const syncDatabase = async () => {
  try {
    await sequelize.sync(); // Use `force: true` only in development to drop and recreate tables
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
    await syncDatabase();
  } catch (error) {
    console.log("Unable to connect to database", error.message);
  }
}
