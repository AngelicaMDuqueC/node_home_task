import { User } from "types";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const changePassword = (password: string): string => {
  return Array(password.length).join("*");
};

export const getUser = (users: User[], reqId: number): User | undefined => {
  return users.find((u) => u.id === reqId);
};

const sortedUsers = (filteredUsers: User[]): User[] =>
  filteredUsers.sort((a, b) => {
    if (a.login < b.login) return -1;
    if (a.login > b.login) return 1;
    return 0;
  });

export const getAutoSuggestUsers = (
  loginSubstring: string,
  limit: number,
  users: User[]
): User[] => {
  const filteredUsers = users.filter((user) =>
    user.login.includes(loginSubstring)
  );
  return sortedUsers(filteredUsers).slice(0, limit);
};

const validPassworkRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/;
export const validations = {
  login: {
    notEmpty: {
      errorMessage: "Login is required",
    },
  },
  password: {
    isLength: {
      errorMessage: "Password should be at least 7 chars long",
      options: { min: 7 },
    },
    matches: {
      options: validPassworkRegexp,
      errorMessage: "",
    },
  },
  age: {
    errorMessage: "Age must be a number",
    isInt: {
      options: { min: 4, max: 130 },
      errorMessage: "Age must be between 4 and 130",
    },
  },
};

export enum statusCode {
  success = 200,
  error = 500,
  notFount = 404,
  required = 417,
  validationError = 400,
  created = 201,
}

export enum codeMessage {
  userSuccess = "Success",
  itemNotFound = "item not found",
  UserDeleted = "User deleted successfully",
  UserUpdated = "User updated successfully",
  fieldsRequired = "all fields are required",
}

export const dataValidation = <T>(res: Response, userItem: T): void => {
  if (!userItem) {
    res.status(statusCode.notFount).send({ message: codeMessage.itemNotFound });
    return;
  }
  if (typeof userItem === "string") {
    res.status(statusCode.success).send({ message: userItem });
    return;
  }
  res
    .status(statusCode.success)
    .send({ message: codeMessage.userSuccess, userObject: userItem });
  return;
};

export const handleValidationRequest = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(statusCode.validationError).send({ errors: errors.array() });
    throw new Error("Validation Error");
  }
};
