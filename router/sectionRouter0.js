import express from 'express'
import {list} from "../controller/sectionController.js"

let router = express.Router();

router.get ('/',list);

export default router ;