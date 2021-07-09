"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("../controllers/category.controller"));
const router = express_1.default();
const category = new category_controller_1.default();
router.get('/', category.getAllCategories);
router.post('/', category.addCategory);
router.get('/:id', category.getCategory);
router.patch('/:id', category.updateCategory);
router.delete('/:id', category.deleteCategory);
exports.default = router;
