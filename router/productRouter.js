import express from 'express';
import { create, list, get, put, remove } from '../controller/productController.js';

let router = express.Router();


//router.use(verifyJWT);

router.post('/', create);
router.get('/', list);
router.get('/:id', get);
router.put('/:id', put);
router.delete('/:id', remove);

export default router;
