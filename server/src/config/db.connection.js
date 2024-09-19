import { Sequelize } from "sequelize";

import { dialect, host, username, password, database, port } from "./db.config.js";

export const sequelize = new Sequelize({
    dialect,
    host,
    username,
    password,
    database,
    port,
    logging: false
});

export async function connectDatabase() {
    try {
      await sequelize.authenticate();
      console.log("Connected to database");
    } catch (error) {
      console.log("Unable to connect to database", error.message);
    }
}