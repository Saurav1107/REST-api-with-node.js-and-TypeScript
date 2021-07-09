import  Router from "express";
import  categoryController from "../controllers/category.controller";

const router = Router();

const category = new categoryController();

router.get('/',category.getAllCategories);

router.post('/',category.addCategory);

router.get('/:id',category.getCategory);

router.patch('/:id' , category.updateCategory);

router.delete('/:id',category.deleteCategory);

export default router;