import express from 'express';
import {get} from '../controller/fileController.js';

let router = express.Router();

router.get('/:filename', get);

router.get('/', (req, res) => {
	res.end('HelloWorld')
})

export default router;
