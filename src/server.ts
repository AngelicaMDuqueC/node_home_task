import express from "express";
import { env } from "process";
import dotenv from "dotenv";
import morgan from "morgan";
import { routes } from "./routes/routes";

dotenv.config();

const app = express();
const { PORT = 3000 } = env;

app.use(morgan(`Listening on port ${PORT}`));
app.use(express.json({ limit: "50mb" }));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
routes(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
