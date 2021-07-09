"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.insertProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const category_model_1 = __importDefault(require("../models/category.model"));
// To insert Item into the Bucket or CheckList
const insertProduct = async (req, res, next) => {
    try {
        const fetchedCat = await category_model_1.default.findById(req.body.categoryId);
        if (!fetchedCat) {
            throw new Error('Category Not Found');
        }
        else {
            const productName = req.body.item;
            const newProduct = new product_model_1.default({
                productName: productName,
                categoryId: req.body.categoryId
            });
            const savedItem = await newProduct.save();
            res.status(201).json({
                message: 'Product Added',
                product: {
                    id: savedItem._id,
                    Name: savedItem.productName,
                    category: {
                        name: fetchedCat.category,
                        id: fetchedCat._id
                    }
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/product/' + savedItem._id
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.insertProduct = insertProduct;
// Get all the items from Check List
const getProducts = async (req, res, next) => {
    try {
        const items = await product_model_1.default.find().select('productName id categoryId').populate('categoryId');
        if (items == null) {
            throw new Error('List is Empty');
        }
        else {
            const response = {
                Total_items: items.length,
                Products: items.map(item => {
                    return {
                        item: item.productName,
                        id: item._id,
                        category: item.categoryId,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/product/' + item._id
                        },
                        requestType: {
                            type: 'POST',
                            url: 'http://localhost:3000/product/',
                            body: {
                                item: {
                                    type: 'String',
                                    details: 'Name of an Item'
                                }
                            }
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
exports.getProducts = getProducts;
//Get an individual Product from Products by its id
const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = await product_model_1.default.findById(id).select('item count').populate('categoryId');
        if (!item) {
            throw new Error('Enter Valid Id');
        }
        else {
            const response = {
                item: item,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/product'
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
exports.getProduct = getProduct;
//update any item information in check list
const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = req.body.item;
        const listItem = await product_model_1.default.findById(id).select('item');
        if (item == null) {
            throw new Error('Can not accept null values');
        }
        else if (!listItem) {
            throw new Error('No Item exist with this id');
        }
        else {
            const updatedItem = await product_model_1.default.updateOne({
                _id: id
            }, {
                $set: {
                    productName: item
                }
            });
            res.json({
                message: 'Product Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/product/' + id
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
exports.updateProduct = updateProduct;
//Delete any particular item from the check list
const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const listItem = await product_model_1.default.findById(id).select('item count');
        console.log(listItem);
        if (listItem == null) {
            throw new Error('No item Exist by this id');
        }
        else {
            const deletedItem = await product_model_1.default.deleteOne({ _id: id });
            console.log(deletedItem);
            const response = {
                message: 'Item removed from List',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/product',
                    body: {
                        item: 'string',
                        count: 'number'
                    }
                }
            };
            res.json(response);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteProduct = deleteProduct;
