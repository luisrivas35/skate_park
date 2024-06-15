import { Router } from "express";
import { isAuthenticated, isAdmin } from "../utils/auth.js";
import {
  getAllSkaters,
  registryForm,
  createSkater,
  login,
  checkLogin,
  logAdmin,
  getProfile,
  updateProfile,
  deleteAccount,
  updateEstado,
} from "../controllers/skaters.controller.js";

const router = Router();


// Public routes
router.get("/", getAllSkaters);
router.get("/registry", registryForm);
router.post("/add-skater", createSkater);
router.get("/login", login);
router.post("/check-login", checkLogin);

// Logged-in routes
router.get("/skater", isAuthenticated, getProfile);
router.post("/update-skater", isAuthenticated, updateProfile);
router.delete("/delete-skater", isAuthenticated, deleteAccount);

//admin
router.get("/admin", isAuthenticated, isAdmin, logAdmin );
router.patch("/update-estado/:id", isAuthenticated, isAdmin, updateEstado);


export default router;
