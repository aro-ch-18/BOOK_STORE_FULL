const express=require('express')
const app=express();

require("dotenv").config();
const PORT=process.env.PORT||4000;
const cors=require("cors");
app.use(express.json());
app.use(cors())
const db=require("./config/database");
db();
const route1=require("./routes/otp")
app.use("/api/v1",route1);
const route2=require("./routes/book");
const route3=require("./routes/user");
app.use("/api/v1/user",route3);
app.use("/api/v1/book",route2);
app.listen(PORT,()=>{
    console.log("App is listeneing in PORT",PORT);
} )
app.get("/",(req,res)=>{
    res.send( "<h1>This is the MERN APP</h1>");
})
