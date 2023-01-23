import UserModel from "../../database/models/user";
import { User } from "types";

export const setUserCreation = async (
  userData: User
): Promise<UserModel | null> => {
  return UserModel.create(userData);
};

export const getUserById = async (id: number): Promise<UserModel | null> => {
  return UserModel.findByPk(id);
};

export const getAllUsers = async (): Promise<UserModel[] | null> => {
  return UserModel.findAll();
};

export const updateUser = async (
  id: number,
  updates: User
): Promise<UserModel | null> => {
  await UserModel.update(updates, { where: { id } });
  return UserModel.findByPk(id);
};

export const deleteUser = async (id: number): Promise<number | undefined> => {
  return UserModel.destroy({ where: { id } });
};
