"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const content_controller_1 = __importDefault(require("../controllers/content.controller"));
const router = express_1.default();
const content = new content_controller_1.default();
router.get('/', content.getAllcontents);
router.post('/', content.addContent);
router.get('/:id', content.getAllcontents);
router.patch('/:id', content.updateContent);
router.delete('/:id', content.deleteContent);
exports.default = router;
