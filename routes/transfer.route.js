import { Router } from "express";
import {
  createTransfer,
  getAllTransfers,
} from "../controllers/transfer.controller.js";


const router = Router();


router.get("/", getAllTransfers);
router.post("/", createTransfer);

export default router;
