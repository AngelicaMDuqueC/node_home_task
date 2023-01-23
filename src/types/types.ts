export type User = {
  id: number;
  login: string;
  password: string;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserResp = User | User[] | null;
