const cartModel = require('../models/cartModel');
const Product =require('../models/productModel');


const addtoCart = async(req,res)=>{
    const{product_id,quantity} = req.body;
    const user_id = req.user.id;
    
    try{
        const cart = await cartModel.findOne({user_id});
        if(cart){
            const oldProduct = cart.products.find((p)=>p.product_id === product_id);
            
            if(oldProduct){
                oldProduct.quantity = quantity;

            }
            else{
                cart.products.push({product_id,quantity});
            }
            await cart.save();

            return res.status(200).json({message:"Product added to cart"});

        }
        else{
            const newCart = new cartModel({
                user_id,
                products:[{product_id,quantity}]
            });
            await newCart.save();
            return res.status(200).json({message:"Product added to cart"});

           }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
}

const getCart = async(req,res)=>{
    const user_id = req.user.id;
    const user = await cartModel.findOne({user_id});
    let subtotal = 0;
    if(user){
        const productDetails = user.products;
        
        const details = await Promise.all(productDetails.map( async(item)=>{
            const product = await Product.findOne({Id:item.product_id});
            subtotal += product.price * item.quantity; 
            return({
                title:product.title,
                description:product.description,
                price:product.price,
                image:product.image,
                quantity:item.quantity
            })
            
        }
        ))
        res.send({details,subtotal});
    }else{
        res.status(404).json({message:"User not found"})
    }
}

const deleteProducts =async(req,res)=>{
    const{product_id} = req.body;
    const user_id = req.user.id;

    try{
        const user = await cartModel.findOne({user_id});
        if(!user){
            return res.status(404).json({message:"User not found"});
       
        }
        
        const cartIndex = user.products.findIndex((product)=>product.product_id === product_id);
        if(cartIndex === -1){
            return res.status(404).json({message:"Product not found in cart"});

        
        }
        user.products.splice(cartIndex,1);
        if(user.products.length > 0){
            await user.save();
        }else{
            await cartModel.deleteOne({
                user_id
            })
        }
        
        return res.status(200).json({message:"Product deleted from cart"});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
}


module.exports = {addtoCart, getCart, deleteProducts};