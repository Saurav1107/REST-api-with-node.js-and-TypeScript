import Router from 'express';
import * as  productController from "../controllers/product.controller"
const router = Router();

router.post('/', productController.insertProduct);

router.get('/', productController.getProducts);

router.get('/:id', productController.getProduct);

router.patch('/:id', productController.updateProduct);

router.delete('/:id',);

export default router