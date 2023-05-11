import express from 'express';
//import { create, list, get, getdate, put, remove } from '../controller/TicketDBController.js';
import { create, list, get, getdate } from '../controller/TicketDBController.js';
let router = express.Router();

router.post('/', create);
router.get('/', list);
router.get('/:id', get);
router.get('/date/:date', getdate);
// router.put('/:id', put);
// router.delete('/:id',remove);

export default router;
