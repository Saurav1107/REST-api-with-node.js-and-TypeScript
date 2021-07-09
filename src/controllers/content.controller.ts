import { RequestHandler } from "express";
import Content from "../models/content.model";
import Product from "../models/product.model";

export default class contentController {

  public addContent : RequestHandler = async(req,res,next)=> {
    try {
      const fetchedProduct = await Product.findById(req.body.productId);
    if(!fetchedProduct){
      throw new Error('Product Not Found');
    }else{
      const content = new Content({
        count : req.body.count,
        productId : req.body.productId
      });
      const savedContent = await content.save();
      const response = {
        message : 'Content added for product',
        addedContent : {
          id : savedContent._id,
          Product : {
            productId : fetchedProduct._id,
            Name : fetchedProduct.productName
          },
          count : savedContent.count
        },
        request : {
          type : 'GET',
          url : 'http://localhost:3000/content/'+savedContent._id
        }
      }
      res.status(200).json(response);
    }
    } catch (error) {
      res.json(error)
    }
  }
  public getAllcontents : RequestHandler = async(req,res,next)=> {
    try {
      const contents = await Content.find().select('productId _id count').populate('productId', 'productName');
      console.log(contents);
      const response = {
        Total_Items : contents.length,
        Content_List : contents.map(content => {
          return {
            Id : content._id,
            productId : content.productId,
            count : content.count,
            request : {
              type : 'GET',
              url : 'http://localhost:3000/content/'+content._id
            }
          }
        })
      }
      res.status(200).json(response);
    } catch (error) {
      res.json({
        message : error.message
      })
    }
    
  }
  public getContent : RequestHandler = async(req,res,next)=> {
      try {
        const content = await Content.findById(req.params.id).populate('productId');
        const response = {
          Content : content,
          request : {
            type : "GET",
            url : 'http://localhost:3000/content'
          }
        }
        res.json(response);
      } catch (error) {
        res.json({
          message : error.message
        })
      }
  }
  public updateContent : RequestHandler = async(req,res,next)=> {
    try {
      const count = (req.body as {count : number}).count;
      const item = Content.findById(req.params.id).select('count');
      if(!count){
        throw new Error('Null value not valid');
      }else if(!item){
        throw new Error('Enter valid Id');
      }
      await Content.updateOne({_id : req.params.id} ,{$set : {
        count : count
      }});
      res.json({
        message : 'Content Updated',
        request : {
          type : 'GET',
          url : 'http://localhost:3000/content/'+req.params.id
        }
      })
    } catch (error) {
      res.json({
        message : error.message
      })
    }
  }
  public deleteContent : RequestHandler = async(req,res,next)=> {
    try {
      const id = (req.params as { id: string }).id;
      const listItem = await Content.findById(id).select('item count')
      console.log(listItem);
      if (listItem == null) {
        throw new Error('No item Exist by this id');
      }else{
        await Content.deleteOne({_id: id});
        res.json({
          message : 'Content Deleted',
          url : {
            type : 'GET',
            url : 'http://localhost:3000/content'
          }
        })
      }
    } catch (error) {
      res.status(500).json({
        message : error.message
      })
    }
  }
}