import { RequestHandler } from "express";
import CheckList from "../models/checkList.model";

// To insert Item into the Bucket or CheckList
export const createItem: RequestHandler = async (req, res, next) => {
  try {
    const item = (req.body as { item: string }).item;
    const count = (req.body as { count: number }).count;
    const newItem = new CheckList({
      item: item,
      count: count
    });
    const savedItem = await newItem.save();
    res.status(201).json({
      message: 'Item Added into bucket',
      item: savedItem
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all the items from Check List
export const getItems: RequestHandler = async (req, res, next) => {
  try {
    const items = await CheckList.find();
    if (items == null) {
      throw new Error('List is Empty');
    } else {
      const response: Object = {
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

//Get an individual Item from check list from its id
export const getItem: RequestHandler = async (req, res, next) => {
  try {
    const id = (req.params as { id: string }).id;
    const item = await CheckList.findById(id).select('item count');
    if (!item) {
      throw new Error('Enter Valid Id');
    } else {
      const response = {
        item: item,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/checkList'
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
export const updateItem: RequestHandler = async (req, res, next) => {
  try {
    const id = (req.params as { id: string }).id;
    const item = (req.body as { item: string }).item;
    const count = (req.body as { count: number }).count;
    const listItem = await CheckList.findById(id).select('item count')
    if (item == null || count == null) {
      throw new Error('Can not accept null values')
    } else if (!listItem) {
      throw new Error('No Item exist with this id')
    } else {
      const updatedItem = await CheckList.updateOne(
        {
          _id: id
        },
        {
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
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

//Delete any particular item from the check list

export const deleteItem: RequestHandler = async (req, res, next) => {
  try {
    const id = (req.params as { id: string }).id;
    const listItem = await CheckList.findById(id).select('item count')
    console.log(listItem);
    if (listItem == null) {
      throw new Error('No item Exist by this id');
    } else {
      const deletedItem = await CheckList.deleteOne({ _id: id });
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
      }
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}