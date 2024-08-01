const mongoose = require('mongoose');
const productschema =new mongoose.Schema({
    Id:{
        type: String,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        
    },
    rating:{
        rate:{
            type:Number,
        },
        count:{
            type: Number,
        }
    }
});

const productModel = mongoose.model('product',productschema);
module.exports = productModel;