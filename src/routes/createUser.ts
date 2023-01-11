import express, { Request, Response } from "express";
import { validations } from "../utils";
import { checkSchema, validationResult } from "express-validator";
import { createUser } from "../data-access/user";

const router = express.Router();

router.post(
  "/create",
  checkSchema(validations),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const userData = req.body;
    try {
      const user = await createUser(userData);
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

export default router;
