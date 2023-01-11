import { Client } from "pg";
import { env } from "process";
import dotenv from "dotenv";
dotenv.config();

const { POSTGRES_URL } = env;
export const client = new Client(POSTGRES_URL);

client.connect();

export const db = (text: string, params?: any[]) => {
  return client.query(text, params);
};
