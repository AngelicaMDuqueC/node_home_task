import { Sequelize } from "sequelize";
import { env } from "process";
import dotenv from "dotenv";
dotenv.config();

const { POSTGRES_URL = "" } = env;
const sequelize = new Sequelize(POSTGRES_URL, {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
