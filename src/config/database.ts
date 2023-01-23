import { Sequelize, Dialect } from "sequelize";
import { env } from "process";
import dotenv from "dotenv";
dotenv.config();

const { POSTGRES_URL = "", HOST = "", DIALECT = "" } = env;
const sequelize = new Sequelize(POSTGRES_URL, {
  host: HOST,
  dialect: DIALECT as Dialect,
});

export default sequelize;
