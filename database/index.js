// Package Imports
const Sequelize = require("sequelize");

// Local Imports
const dbConfig = require("./db.config");
const {
  getUserModel,

} = require("./models");

const defineRelations = (db) => {

  // Relations for 
  
};

class Database {
  static db = {};
  static connect() {
    const sequelize = new Sequelize(
      dbConfig.DB,
      dbConfig.USER,
      dbConfig.PASSWORD,
      {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        // logging: false,
        pool: { ...dbConfig.pool },
      }
    );

    const { db } = Database;

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;



    db.Users = getUserModel(sequelize);
    
    



    // define relations
    defineRelations(db);

    db.sequelize
      .sync()
      .then(() => {
        console.log("Synced db.");
      })
      .catch((err) => {
        console.log("Failed to sync db: " + err.message);
      });
  }
}

module.exports = Database;
