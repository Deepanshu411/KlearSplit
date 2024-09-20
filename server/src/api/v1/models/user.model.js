import { DataTypes } from "sequelize";

import { sequelize } from "../../../config/db.connection.js";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png",
    },
    notification_settings: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 63,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: [
          "password",
          "createdAt",
          "updatedAt",
          "deletedAt",
          "notification_settings",
          "is_admin",
        ],
      },
    },
    scopes: {
      withPassword: {
        attributes: {},
      },
    },
  },
);

export default User;
