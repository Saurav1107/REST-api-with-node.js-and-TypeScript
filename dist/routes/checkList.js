"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkList_controller_1 = require("../controllers/checkList.controller");
const router = express_1.default();
router.post('/', checkList_controller_1.createItem);
router.get('/', checkList_controller_1.getItems);
router.get('/:id', checkList_controller_1.getItem);
router.patch('/:id', checkList_controller_1.updateItem);
router.delete('/:id', checkList_controller_1.deleteItem);
exports.default = router;
