import { RequestHandler } from "express";
import Product from "../models/product.model";
import Category from "../models/category.model";

// To insert Item into the Bucket or CheckList
export const insertProduct: RequestHandler = async (req, res, next) => {
  try {
    const fetchedCat = await Category.findById(req.body.categoryId);
    if(!fetchedCat){
      throw new Error('Category Not Found');
    }else{
      const productName = (req.body as { item: string }).item;
      const newProduct = new Product({
        productName: productName,
        categoryId : req.body.categoryId
      });
      const savedItem = await newProduct.save();
      res.status(201).json({
        message: 'Product Added',
        product: {
          id : savedItem._id,
          Name : savedItem.productName,
          category : {
            name : fetchedCat.category,
            id : fetchedCat._id
          }
        },
        request : {
          type : 'GET',
          url : 'http://localhost:3000/product/'+savedItem._id
        } 
      })
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all the items from Check List
export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const items = await Product.find().select('productName id categoryId').populate('categoryId');
    if (items == null) {
      throw new Error('List is Empty');
    } else {
      const response: Object = {
        Total_items: items.length,
        Products: items.map(item => {
          return {
            item: item.productName,
            id: item._id,
            category : item.categoryId,
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
          }
        })
      }
      res.status(200).json(response)
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

//Get an individual Product from Products by its id
export const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const id = (req.params as { id: string }).id;
    const item = await Product.findById(id).select('item count').populate('categoryId');
    if (!item) {
      throw new Error('Enter Valid Id');
    } else {
      const response = {
        item: item,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/product'
        }
      }
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


//update any item information in check list
export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const id = (req.params as { id: string }).id;
    const item = (req.body as { item: string }).item;
    const listItem = await Product.findById(id).select('item')
    if (item == null) {
      throw new Error('Can not accept null values')
    } else if (!listItem) {
      throw new Error('No Item exist with this id')
    } else {
      const updatedItem = await Product.updateOne(
        {
          _id: id
        },
        {
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
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

//Delete any particular item from the check list

export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const id = (req.params as { id: string }).id;
    const listItem = await Product.findById(id).select('item count')
    console.log(listItem);
    if (listItem == null) {
      throw new Error('No item Exist by this id');
    } else {
      const deletedItem = await Product.deleteOne({ _id: id });
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
      }
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}