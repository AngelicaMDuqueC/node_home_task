import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { changePassword, getUser, getAutoSuggestUsers } from "../utils";

import { User } from "types";

const users: Array<User> = [];

export const getUsers = (req: Request, res: Response) => {
  const loginSubstring = req.query.loginSubstring as string;
  const limit = parseInt(req?.query?.limit as string);

  if (!loginSubstring && !limit) {
    return res.send(users);
  }
  const suggestedUsers = getAutoSuggestUsers(loginSubstring, limit, users);
  res.send(suggestedUsers);
};

export const getUserById = (req: Request, res: Response) => {
  const user = getUser(users, req.params.id);
  if (!user || user.isDeleted) return res.status(404).send("user not found");
  res.send(user);
};

export const validateUser = (req: Request, res: Response, next: () => void) => {
  const { login, password, age } = req.body;
  if (!login || !password || !age) {
    return res.status(411).send("all fields are required");
  }
  next();
};

export const updateUserById = (req: Request, res: Response) => {
  const user: User | undefined = getUser(users, req.params.id);
  if (!user || user.isDeleted) {
    return res.status(404).send("User not found");
  }
  user.login = req?.body?.login;
  user.password = req?.body?.password;
  user.age = req?.body?.age;
  const copyUser = { ...user, password: changePassword(user.password) };
  res.send(copyUser);
};

export const createUser = (req: Request, res: Response) => {
  const user = {
    id: uuidv4().toString().substring(0, 5),
    login: req?.body?.login,
    password: req?.body?.password,
    age: req?.body?.age,
    isDeleted: false,
  } as unknown as User;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

  const copyUser = { ...user, password: changePassword(user.password) };
  users.push(user);
  res.status(201).send(copyUser);
};

export const deleteUser = (req: Request, res: Response) => {
  const user = getUser(users, req.params.id);
  if (!user || user.isDeleted) {
    return res.status(404).send("User not found");
  }
  user.isDeleted = true;
  res.send(user);
};
