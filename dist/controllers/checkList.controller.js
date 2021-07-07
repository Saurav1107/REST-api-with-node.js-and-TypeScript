"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.getItem = exports.getItems = exports.createItem = void 0;
const checkList_model_1 = __importDefault(require("../models/checkList.model"));
// To insert Item into the Bucket or CheckList
const createItem = async (req, res, next) => {
    try {
        const item = req.body.item;
        const count = req.body.count;
        const newItem = new checkList_model_1.default({
            item: item,
            count: count
        });
        const savedItem = await newItem.save();
        res.status(201).json({
            message: 'Item Added into bucket',
            item: savedItem
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createItem = createItem;
// Get all the items from Check List
const getItems = async (req, res, next) => {
    try {
        const items = await checkList_model_1.default.find();
        if (items == null) {
            throw new Error('List is Empty');
        }
        else {
            const response = {
                Total_items: items.length,
                items: items.map(item => {
                    return {
                        item: item.item,
                        count: item.count,
                        id: item._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/' + item._id
                        },
                        requestType: {
                            type: 'POST',
                            url: 'http://localhost:3000/',
                            body: {
                                item: {
                                    type: 'String',
                                    details: 'Name of an Item'
                                },
                                count: {
                                    type: 'Number',
                                    details: 'Total number of Items'
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
exports.getItems = getItems;
//Get an individual Item from check list from its id
const getItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = await checkList_model_1.default.findById(id).select('item count');
        if (!item) {
            throw new Error('Enter Valid Id');
        }
        else {
            const response = {
                item: item,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/checkList'
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
exports.getItem = getItem;
//update any item information in check list
const updateItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = req.body.item;
        const count = req.body.count;
        const listItem = await checkList_model_1.default.findById(id).select('item count');
        if (item == null || count == null) {
            throw new Error('Can not accept null values');
        }
        else if (!listItem) {
            throw new Error('No Item exist with this id');
        }
        else {
            const updatedItem = await checkList_model_1.default.updateOne({
                _id: id
            }, {
                $set: {
                    item: item,
                    count: count
                }
            });
            res.json({
                message: 'Product Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/checkList/' + id
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
exports.updateItem = updateItem;
//Delete any particular item from the check list
const deleteItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const listItem = await checkList_model_1.default.findById(id).select('item count');
        console.log(listItem);
        if (listItem == null) {
            throw new Error('No item Exist by this id');
        }
        else {
            const deletedItem = await checkList_model_1.default.deleteOne({ _id: id });
            console.log(deletedItem);
            const response = {
                message: 'Item removed from List',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/checkList',
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
exports.deleteItem = deleteItem;
