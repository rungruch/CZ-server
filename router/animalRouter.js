import express from "express";
import { list } from "../controller/animalsController.js";

let router = express.Router();

router.get("/",list);

export default router;