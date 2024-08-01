const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:trusted,

    },
    user_email:{
        type:String,
        required:true
    },
    cust_name:{
        type:String,
        required:true
    },
    cust_phno:{
        type:Number,
        required:true
    },
    cust_address:{
        type:String,
        required:true
    },
    orderDate:{
        type:Date,
        
    },
    estDate:{
        type:Date,
        
    },
    tot_Amount:{
        type:Number,

    },
    orderStatus:{
        type:String,

    },
    products:[{
        product_id:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }]


});

module.exports = {orderSchema}