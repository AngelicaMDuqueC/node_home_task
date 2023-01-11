import { Request, Response, Router } from "express";
import { validations } from "../utils";
import { checkSchema } from "express-validator";
import {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../data-access/user";

const router = Router();

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/users/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const user = await getUserById(id);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
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
    const userId = Number(req.params.id);
    const updates = req.body;
    try {
      const user = await updateUser(userId, updates);
      if (!user) {
        res.status(404).send({ message: "User not found" });
        return;
      }
      console.log(user);
      res.status(200).send({ message: "User updated successfully", user });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
);

router.delete("/users/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  try {
    const affectedRows = await deleteUser(userId);
    if (!affectedRows) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  res.redirect("/users");
});

export default router;
