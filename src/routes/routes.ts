import express, { Express } from "express";
import { validations } from "../utils";
import { checkSchema } from "express-validator";
import {
  getUsers,
  getUserById,
  updateUserById,
  createUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

export const routes = (app: Express) => {
  // get  all users
  router.get("/users", getUsers);
  // get user by id
  router.get("/users/:id", getUserById);
  // Delete a Tutorial with id
  router.delete("/users/:id", deleteUser);
  // create user
  router.post("/users", checkSchema(validations), createUser);
  // Update a user with id
  router.put("/users/:id", checkSchema(validations), updateUserById);
  app.use("/", router);
};
