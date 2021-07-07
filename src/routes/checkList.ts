import Router from 'express';
import { createItem, deleteItem, getItem, getItems, updateItem } from "../controllers/checkList.controller"
const router = Router();

router.post('/', createItem);

router.get('/', getItems);

router.get('/:id', getItem);

router.patch('/:id', updateItem);

router.delete('/:id', deleteItem);


export default router