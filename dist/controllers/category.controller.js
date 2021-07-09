"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = __importDefault(require("../models/category.model"));
class categoryController {
    constructor() {
        this.addCategory = async (req, res, next) => {
            try {
                const bodyCategory = req.body.category;
                const category = new category_model_1.default({ category: bodyCategory });
                const savedCat = await category.save();
                res.status(201).json({
                    message: 'Category added',
                    Category: savedCat
                });
            }
            catch (error) {
                res.status(500).json({
                    message: error.message
                });
            }
        };
        this.getAllCategories = async (req, res, next) => {
            try {
                const categories = await category_model_1.default.find().select('category _id ');
                if (!categories) {
                    throw new Error('No categories Found');
                }
                else {
                    const response = {
                        Total_Categories: categories.length,
                        Categories: categories.map(item => {
                            return {
                                Name: item.category,
                                id: item._id,
                                request: {
                                    type: 'GET',
                                    url: 'http://localhost:3000/category/' + item._id
                                }
                            };
                        })
                    };
                    res.status(200).json(response);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: error.message
                });
            }
        };
        this.getCategory = async (req, res, next) => {
            try {
                const id = req.params.id;
                const category = await category_model_1.default.findById(id).select('category ');
                if (!category) {
                    throw new Error('Enter Valid Id');
                }
                else {
                    const response = {
                        categroy: category,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/category"
                        }
                    };
                    res.status(200).json(response);
                }
            }
            catch (error) {
                res.status(500).json({
                    message: error.message
                });
            }
        };
        this.updateCategory = async (req, res, next) => {
            try {
                const id = req.params.id;
                const category = req.body.category;
                const listCat = await category_model_1.default.findById(id).select('category');
                if (category == null) {
                    throw new Error('Can not accept null values');
                }
                else if (!listCat) {
                    throw new Error('No Item exist with this id');
                }
                else {
                    const updatedItem = await category_model_1.default.updateOne({
                        _id: id
                    }, {
                        $set: {
                            category: category
                        }
                    });
                    res.status(200).json({
                        message: 'Updated Category',
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/category/' + id
                        }
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: error.message
                });
            }
        };
        this.deleteCategory = async (req, res, next) => {
            try {
                const id = req.params.id;
                const listCat = await category_model_1.default.findById(id).select('category');
                if (!listCat) {
                    throw new Error('Enter Valid Id');
                }
                else {
                    const deleted = await category_model_1.default.deleteOne({ _id: id });
                    res.status(200).json({
                        message: 'Category Deleted',
                        getRequest: {
                            url: 'http://localhost:3000/category'
                        },
                        postRequest: {
                            url: 'http://localhost:3000/category',
                            body: {
                                category: 'Category type'
                            }
                        }
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    message: error.message
                });
            }
        };
    }
}
exports.default = categoryController;
