const { DataTypes } = require("sequelize");

module.exports = (db) => {
  return db.define("users",
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        userName: {
          type: DataTypes.TEXT,
        },
        password: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        role: {type: DataTypes.TEXT,},
        roleAr: {type: DataTypes.TEXT,},
        lang: {type: DataTypes.TEXT,},
        deviceToken: { type: DataTypes.TEXT },
        deviceType: { type: DataTypes.TEXT },
        credentialSentAt: {type: DataTypes.TEXT},
        forgetAt: {type: DataTypes.TEXT},
        forget: { type: DataTypes.BOOLEAN,defaultValue: true,},
        status: { type: DataTypes.BOOLEAN,defaultValue: true,},
        lastLogin: { type: DataTypes.TEXT },
      },
      {
        initialAutoIncrement: 1000000,
      });
};
