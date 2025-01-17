const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    //const token = req.header('Authorization').replace('Bearer ','');//extracting token
    const token = req.header('Authorization').split(' ')[1];//extracting token
    if(!token) return res.status(401).json({error:"Token required"});
    try{
        const decoded = jwt.verify(token,"secret_key");//verifying the token
        req.user = decoded;
        next();//moving to next process
    }catch(err){
        res.status(401).json({error:"Invalid Token"});
    }
};
module.exports = auth;