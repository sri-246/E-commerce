const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
    },
    products:[
        {
            product_id:{
                type:String,
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
}],

});

const Cart = mongoose.model("Cart", cartSchema); //collection name is Cart

module.exports = Cart;