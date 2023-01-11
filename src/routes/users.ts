import { Request, Response, Router } from "express";
import { validations, changePassword } from "../utils";
import { checkSchema } from "express-validator";
import { db } from "../config";

const router = Router();

router.get("/users", async (req: Request, res: Response) => {
  const query = `
  SELECT * FROM usertable
  ORDER BY id;
  `;
  const { rows } = await db(query);
  res.json(rows);
});

router.get("/users/:id", async (req: Request, res: Response) => {
  const query = `
  SELECT * FROM usertable
    WHERE id=$1;
    `;

  const values = [req.params.id];
  const { rows } = await db(query, values);
  res.send(rows);
});

router.use((req: Request, res: Response, next) => {
  const { login, password, age } = req.body;
  if (!login || !password || !age) {
    return res.status(411).send("all fields are required");
  }
  next();
});

// Update a user by id
router.put(
  "/users/:id",
  checkSchema(validations),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { login, password, age } = req.body;
    let sql = "UPDATE usertable";
    const values = [];
    if (login) {
      sql += "login = ?, ";
      values.push(login);
    }
    if (password) {
      sql += "password = ?, ";
      values.push(password);
    }
    if (age) {
      sql += "age = ?, ";
      values.push(age);
    }

    sql = sql.slice(0, -2);
    sql += " WHERE id = ?";
    values.push(id);
    const { rows } = await db(sql, values);
    const copyUser = { ...rows, password: changePassword(password) };
    res.send(copyUser);
  }
);

router.delete("/users/:id", async (req: Request, res: Response) => {
  const query = ` 
    DELETE FROM Note
    WHERE id=$1
    RETURNING *;
    `;
  const values = [req.params.id];
  const result = await db(query, values);
  console.log(result);
  res.redirect("/users");
});

export default router;
