const productModel = require('../models/productModel');
const {v4:uuidv4} = require('uuid');

const getallProducts = async(req,res) =>{
    try{
        const products = await productModel.find();
        res.send(products);
    }
    catch(err){
        console.error(err);
    }

};

//Post API
const postallProducts = async(req,res) =>{
    const {title,description,category,price,image,rating} =req.body;
 
    try{
    
     const newProduct = new productModel({Id:uuidv4(),title,description,category,price,image,rating});
     await newProduct.save();
     
     res.status(201).json(newProduct);
    }
 
    catch(err){
      console.error(err);
    }
 };

 //PUT API

    const putallProducts = async(req,res)=>{
    const{id}=req.params;
    const{title,description,catogery,image,price,rating}=req.body;
    try{
        const NewProduct=await productModel.findOneAndUpdate({_id:id},
            {title,description,catogery,image,price,rating},
            {new:true,runValidators:true});
            if(!NewProduct){
                return res.sendStatus(404);
            }

            res.status(200).json({
                Msg:"success",
                NewProduct: NewProduct
            });

    }catch(err){
        console.error(err);
        res.sendStatus(404);
}};
//DELETE FOR PRODUCT

const deleteallProducts=async(req,res)=>{
    const {id}=req.params;
    try{
        const dproduct=await productModel.findOneAndDelete({_id:id});
        if(!dproduct){
            return res.send("PrODUCT NOT FOUND");
        }
        res.status(200).json({
            Msg:"success fully deleted"

        })
    }catch(err){
        console.error(err);
        res.sendStatus(404);
}};




module.exports = {getallProducts, postallProducts, putallProducts,deleteallProducts}; //exporting the function