import { Request, Response } from "express";
import {
  setUserCreation,
  getUserById as getById,
  getAllUsers,
  updateUser,
  deleteUser as removeUser,
} from "../data-access/user";

import { statusCode, dataValidation, handleValidationRequest } from "../utils";

const { error, created } = statusCode;

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    dataValidation(res, users);
  } catch (err) {
    res.status(error).json({ message: err.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await getById(id);
    dataValidation(res, user);
  } catch (err) {
    res.status(error).send({ message: err.message });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    handleValidationRequest(req, res);
    const userId = Number(req.params.id);
    const updates = req.body;
    const user = await updateUser(userId, updates);
    dataValidation(res, user);
    return;
  } catch (err) {
    if (err.message !== "Validation Error") {
      res.status(error).send({ message: err.message });
    }
    return;
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    handleValidationRequest(req, res);
    const user = await setUserCreation(userData);
    res.status(created).send(user);
  } catch (err) {
    console.log(err.message);
    if (err.message !== "Validation Error") {
      res.status(error).send({ message: err.message });
    }
    return;
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  try {
    const affectedRows = await removeUser(userId);
    dataValidation(res, affectedRows);
  } catch (err) {
    res.status(error).send({ message: err.message });
  }
};
