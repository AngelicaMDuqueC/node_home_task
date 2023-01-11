import UserModel from "../models/user";
import { User } from "types";

export const createUser = async (userData: User) => {
  return UserModel.create(userData);
};

export const getUserById = async (id: number) => {
  return UserModel.findByPk(id);
};

export const getAllUsers = async () => {
  return UserModel.findAll();
};

export const updateUser = async (id: number, updates: any) => {
  await UserModel.update(updates, { where: { id } });
  return UserModel.findByPk(id);
};

export const deleteUser = async (id: number) => {
  return UserModel.destroy({ where: { id } });
};