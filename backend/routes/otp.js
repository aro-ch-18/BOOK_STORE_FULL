const express=require('express');
const router=express.Router();

const {otp}=require("../controllers/otp")

router.post("/sendMail",otp)


module.exports=router;