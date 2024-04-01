import express from 'express';
import { create,list } from '../controller/animalsDBController.js';

const router = express.Router();

router.get('/',list);
router.post('/',create);


export default router