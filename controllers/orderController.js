const orderModel=require('../models/orderModel');
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const manageOrder = async (req, res) => {
  const {cust_name, cust_phno, cust_address} = req.body;
    try {
        const user_id = req.user.id; 
        console.log(user_id);
        const user_email = req.user.email;
        console.log(user_email);
        const userCart = await cartModel.findOne({ user_id });
      

        if (!userCart || userCart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
let orderDate=new Date();
let estDate=new Date(new Date().setDate(new Date().getDate() + 10))
console.log(orderDate,estDate)        
        let tot_Amount = 0;
        const productDetails = [];

        for (const item of userCart.products) {
            const product = await productModel.findOne({Id:item.product_id});
            
            if (product) {
                tot_Amount += product.price * item.quantity;
                productDetails.push({
                    product_id: item.product_id,
                    quantity: item.quantity
                });
            }
        }
        console.log(tot_Amount);
        const orderStatus= "Pending";
        const newOrder = new orderModel({
            user_id,
            user_email, 
            cust_name: cust_name, 
            cust_phno,
            cust_address: cust_address,
            orderDate,
            estDate, 
            tot_Amount,
            orderStatus,
            products: productDetails
        });
      console.log(newOrder);
        const savedOrder = await newOrder.save();

        
        await userCart.deleteOne({ user_id });
        return res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};



module.exports = {manageOrder};
