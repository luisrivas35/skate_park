import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserByName,
  removeUser,
  updateUser,
} from "../controllers/users.controller.js";

const router = Router();


router.get("/", getAllUsers);
router.get("/name/:name", getUserByName);
router.post("/", createUser);
router.delete("/:id", removeUser);
router.put("/:id", updateUser);

export default router;
