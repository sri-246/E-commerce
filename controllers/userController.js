const userModel = require('../models/userModel');
const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postallUser = async(req,res) =>{
   const {name,email,password} =req.body;

   try{
    const existingUser = await userModel.findOne({email});
    if(existingUser){
      return res.status(400).json({msg:"User already exists"});
}
    const newUser = new userModel({Id:uuidv4(),name,email,password});
    await newUser.save();
    
    res.status(201).json(newUser);
   }

   catch(err){
     console.error(err);
   }
};

const loginUser = async(req,res)=>{

  const {email,password} = req.body;
  const user = await userModel.findOne({email});
  try{
    if(!user){
      return res.status(400).json({msg:"User does not exist"});
    }
    const isvalidPassword = await bcrypt.compare(password,user.password);
    if(!isvalidPassword){
      return res.status(400).json({msg:"Invalid password"});
}
const token = jwt.sign({id:user._id},"secret_key",{expiresIn:"1h"});
res.json({token});
  }catch(err){
    console.error(err);
  }
}

//Update API

// const updateallUser = async(req,res)=>{
//   const {Id} = req.params;
//   const {name,email,password} = req.body;
// }


module.exports = {postallUser, loginUser};