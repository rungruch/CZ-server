import express from 'express';
import {create, list, listSection, remove, put, get} from '../controller/SectionDBController.js'; 
let router = express.Router();

// router.get('/:ZoneID', get); 
router.get('/', list); 
router.post('/', create);
router.get('/:zoneID',listSection);
router.delete('/:zoneID/:section',remove);
router.put('/:zoneID/:section',put);
router.get('/:zoneID/:section',get)

export default router;