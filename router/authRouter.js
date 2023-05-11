import express from "express";

import {
  login,
  signup,
  logout,
  restrictTo,
  protect,
} from "./../controller/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
// router.get("/logout", protect, restrictTo("Admin"), logout);

export default router;
