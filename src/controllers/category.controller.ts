import { RequestHandler } from "express";
import Category from "../models/category.model"


export default class categoryController {

  public addCategory : RequestHandler = async(req,res,next) =>{
    try {
      const bodyCategory = (req.body as {category : string}).category;
      const category = new Category({category : bodyCategory})
      const savedCat = await category.save();
      res.status(201).json({
        message  : 'Category added',
        Category : savedCat
      })
    } catch (error) {
      res.status(500).json({
        message : error.message
      })
    } 
  }
  
  public getAllCategories : RequestHandler = async(req,res,next) => {
    try {
      const categories = await Category.find().select('category _id ');
      if(!categories){
        throw new Error('No categories Found');
      }else{
        const response = {
          Total_Categories : categories.length,
          Categories : categories.map(item => {
            return {
              Name : item.category,
              id : item._id,
              request: {
                type: 'GET',
                url: 'http://localhost:3000/category/' + item._id
              }
            }
          })
        }
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json({
        message : error.message
      })
    }
  }
  public getCategory : RequestHandler = async(req,res,next) => {
    try {
      const id = (req.params as {id : string}).id;
      const category = await Category.findById(id).select('category ');
      if(!category){
        throw new Error('Enter Valid Id');
      }else{
        const response = {
          categroy : category,
          request : {
            type : "GET",
            url : "http://localhost:3000/category"
          }
        }
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json({
        message : error.message
      })
    }

  } 
  public updateCategory : RequestHandler = async(req,res,next) => {
    try {
      const id = (req.params as { id: string }).id;
      const category = (req.body as { category: string}).category;
      const listCat = await Category.findById(id).select('category')
      if (category == null) {
        throw new Error('Can not accept null values')
      } else if (!listCat) {
        throw new Error('No Item exist with this id')
      } else {
        const updatedItem = await Category.updateOne(
          {
            _id: id
          },
          {
            $set: {
              category : category
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
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
  public deleteCategory : RequestHandler = async(req,res,next) => {
    try {

      const id = (req.params as {id : string}).id;
      const listCat = await Category.findById(id).select('category');
      if(!listCat){
        throw new Error('Enter Valid Id');
      }else{
        const deleted = await Category.deleteOne({_id : id});
        res.status(200).json({
          message : 'Category Deleted',
          getRequest : {
            url : 'http://localhost:3000/category'
          },
          postRequest : {
            url  : 'http://localhost:3000/category',
            body : {
              category : 'Category type'
            }
          }
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }

}