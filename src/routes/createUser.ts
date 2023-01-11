import { Request, Response, Router } from "express";
import { validations, changePassword } from "../utils";
import { User } from "types";
import { checkSchema, validationResult } from "express-validator";
import { db } from "../config";

const router = Router();

router.post(
  "/create",
  checkSchema(validations),
  async (req: Request, res: Response) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const query = `
    INSERT INTO UserTable (login, password, age, is_deleted )
    VALUES($1,$2,$3,$4)
    RETURNING *;
    `;

    const user = {
      login: req?.body?.login,
      password: req?.body?.password,
      age: req?.body?.age,
      isDeleted: false,
    } as unknown as User;

    const values = [...Object.values(user)];

    const { rows } = await db(query, values);
    const copyUser = { ...rows, password: changePassword(user.password) };
    res.status(201).send(copyUser);
  }
);

export default router;
