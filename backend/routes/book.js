const express=require('express');
const router=express.Router();

const {createBook,getBook,getSBook,updateBook,deleteBook}=require("../controllers/book");
// const {auth}=require("../middleware/auth")
const {auth}=require("../middleware/auth")
router.post("/createBook",auth,createBook);
router.get("/getBook",getBook);
router.get("/getBookId/:id",getSBook);
router.put("/updateBook/:id",auth,updateBook);
router.delete("/deleteBook/:id",auth,deleteBook);
 


module.exports = router;