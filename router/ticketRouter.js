import express from 'express';
import { create, list, get, getdate,getdatetype, put, remove } from '../controller/TicketDBController.js';
let router = express.Router();

router.post('/', create);
router.get('/', list);
router.get('/:id', get);
router.get('/date/:date', getdate);
router.get('/:TicketType/:Date', getdatetype);
router.put('/:id', put);
router.delete('/:id',remove);

export default router;
