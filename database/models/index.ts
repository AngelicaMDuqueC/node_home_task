/* eslint-disable @typescript-eslint/no-var-requires */
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";

dotenv.config({ path: ".env.local" });

const env = process.env.NODE_ENV || "development";
const dbConfig = require(__dirname + "/../config/config.js")[env];
const basename = path.basename(__filename);

const db: any = {};

let sequelize: Sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(
    process.env[dbConfig.use_env_variable] || "",
    dbConfig
  );
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
