import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  setUserCreation,
  getUserById as getById,
  getAllUsers,
  updateUser,
  deleteUser as removeUser,
} from "../data-access/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await getById(id);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validateUser = (req: Request, res: Response, next: () => void) => {
  const { login, password, age } = req.body;
  if (!login || !password || !age) {
    res.status(411).send("all fields are required");
    return;
  }
  next();
};

export const updateUserById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
    return;
  }
  const userId = Number(req.params.id);
  const updates = req.body;
  try {
    const user = await updateUser(userId, updates);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.status(200).send({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
    return;
  }
  const userData = req.body;
  try {
    const user = await setUserCreation(userData);
    res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  try {
    const affectedRows = await removeUser(userId);
    if (!affectedRows) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  res.redirect("/users");
};
