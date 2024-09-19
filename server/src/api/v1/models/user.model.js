import { DataTypes } from "sequelize";

import { sequelize } from "../../../config/db.connection.js";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }
    }
)