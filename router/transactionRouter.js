// file: ./route/userRoute.js
import express from 'express';
// import { list, get, put } from '../controller/transactionController.js';
import { list, get, create } from '../controller/transactionController.js';
let router = express.Router();
router.post('/', create);
router.get('/', list); 
router.get('/:id', get); 
// router.put('/:email', put);
export default router;