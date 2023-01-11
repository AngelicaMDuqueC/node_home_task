import express from "express";
import { env } from "process";
import dotenv from "dotenv";
import morgan from "morgan";
import createUser from "./routes/createUser";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();
const { PORT = 3000 } = env;

app.use(morgan(`Listening on port ${PORT}`));
app.use(express.json({ limit: "50mb" }));

app.set("view engine", "pug");
app.use(morgan("dev"));

app.use("/", userRoutes);
app.use("/", createUser);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
