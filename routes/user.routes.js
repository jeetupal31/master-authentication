import express from "express";
import {
  getProfile,
  login,
  logout,
  registerUser,
  verify,
  forgotPassword,
  resetPassword,
} from "../controllers/use.controller.js";
import isLoggedIn from "../middleware/isloggedin.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verify);
router.post("/login", login);
router.get("/get-profile", isLoggedIn, getProfile);
router.post("/logout", isLoggedIn, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
