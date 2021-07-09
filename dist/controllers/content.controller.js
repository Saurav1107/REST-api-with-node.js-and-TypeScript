"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_model_1 = __importDefault(require("../models/content.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
class contentController {
    constructor() {
        this.addContent = async (req, res, next) => {
            try {
                const fetchedProduct = await product_model_1.default.findById(req.body.productId);
                if (!fetchedProduct) {
                    throw new Error('Product Not Found');
                }
                else {
                    const content = new content_model_1.default({
                        count: req.body.count,
                        productId: req.body.productId
                    });
                    const savedContent = await content.save();
                    const response = {
                        message: 'Content added for product',
                        addedContent: {
                            id: savedContent._id,
                            Product: {
                                productId: fetchedProduct._id,
                                Name: fetchedProduct.productName
                            },
                            count: savedContent.count
                        },
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/content/' + savedContent._id
                        }
                    };
                    res.status(200).json(response);
                }
            }
            catch (error) {
                res.json(error);
            }
        };
        this.getAllcontents = async (req, res, next) => {
            try {
                const contents = await content_model_1.default.find().select('productId _id count').populate('productId', 'productName');
                console.log(contents);
                const response = {
                    Total_Items: contents.length,
                    Content_List: contents.map(content => {
                        return {
                            Id: content._id,
                            productId: content.productId,
                            count: content.count,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/content/' + content._id
                            }
                        };
                    })
                };
                res.status(200).json(response);
            }
            catch (error) {
                res.json({
                    message: error.message
                });
            }
        };
        this.getContent = async (req, res, next) => {
            try {
                const content = await content_model_1.default.findById(req.params.id).populate('productId');
                const response = {
                    Content: content,
                    request: {
                        type: "GET",
                        url: 'http://localhost:3000/content'
                    }
                };
                res.json(response);
            }
            catch (error) {
                res.json({
                    message: error.message
                });
            }
        };
        this.updateContent = async (req, res, next) => {
            try {
                const count = req.body.count;
                const item = content_model_1.default.findById(req.params.id).select('count');
                if (!count) {
                    throw new Error('Null value not valid');
                }
                else if (!item) {
                    throw new Error('Enter valid Id');
                }
                await content_model_1.default.updateOne({ _id: req.params.id }, { $set: {
                        count: count
                    } });
                res.json({
                    message: 'Content Updated',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/content/' + req.params.id
                    }
                });
            }
            catch (error) {
                res.json({
                    message: error.message
                });
            }
        };
        this.deleteContent = async (req, res, next) => {
            try {
                const id = req.params.id;
                const listItem = await content_model_1.default.findById(id).select('item count');
                console.log(listItem);
                if (listItem == null) {
                    throw new Error('No item Exist by this id');
                }
                else {
                    await content_model_1.default.deleteOne({ _id: id });
                    res.json({
                        message: 'Content Deleted',
                        url: {
                            type: 'GET',
                            url: 'http://localhost:3000/content'
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
exports.default = contentController;
