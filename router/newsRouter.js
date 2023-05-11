import express from 'express';
import {list} from '../controller/newsController.js';

let router = express.Router();

router.get('/', list);


export default router;
