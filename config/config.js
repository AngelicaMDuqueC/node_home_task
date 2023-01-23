/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { env } = require("process");
const dotenv = require("dotenv");
dotenv.config();

const { POSTGRES_URL = "" } = env;
module.exports = {
  development: {
    url: POSTGRES_URL,
    dialect: "postgres",
    logging: false,
  },
};
