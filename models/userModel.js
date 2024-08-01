const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    Id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:[true,'Please enter your name']
        
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please enter your password']
    }
});

//Hash password before saving to database
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;