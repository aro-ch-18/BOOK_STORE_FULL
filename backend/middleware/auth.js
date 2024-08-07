const jwt = require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/userModel");


exports.auth = (req,res, next) => {
    try{
        //extract JWT token
        //PENDING : other ways to fetch token
        // console.log("I AM IN AUTH")
        // console.log("cookie" , req.cookies.token);
        // console.log("body" , req.body.token);
        // console.log("header", req.header("Authorization"));
    //    console.log("asdfadsf");
        // let token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        const token=req.header("Authorization").replace("Bearer ", "");
        // console.log(token)
        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }

        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            //why this ?
            req.user = payload;
        } catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    } 
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }
   
}

exports.isAdmin = async (req,res,next) => {
    try{
        // const
        // console.log(req.body)
        if(req.body.id) {
            const user=await User.findById(req.body.id);
            // console.log(user.role);

            if(user.role == 'admin') 
            next()
            else{
                return res.json({
                    success:false,
                    message:"Not admin!"
                })
            }
        }
        
}
catch(error) {
    return res.status(500).json({
        success:false,
        message:'Something went wrong!',
    })
}
}