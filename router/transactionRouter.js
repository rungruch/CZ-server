import express from 'express';
import { create, list, get} from '../controller/TransactionDBController.js';

let router = express.Router();

router.post('/', create);
router.get('/', list);
router.get('/:id', get);

export default router;
