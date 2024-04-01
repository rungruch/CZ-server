import express from "express";

import {
  editprofile,
  get,
  list,
} from "./../controller/UserController.js";

const router = express.Router();
router.put("/:email", editprofile);
router.get("/:email", get);
router.get("/", list);

// router.get("/logout", protect, restrictTo("Admin"), logout);

export default router;
