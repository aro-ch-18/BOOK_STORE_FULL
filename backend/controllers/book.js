
const Book=require("../models/bookModel");

exports.createBook=async (req,res)=>{
    try{
        const data=req.body;
        console.log(data);
        if(!data.title||!data.author||!data.publishYear){
            return res.status(404).json({
                success:false,
                message:"Send all the required data carefully"
            })
        }

        const newBook={
            title:data.title,
            author:data.author,
            publishYear:data.publishYear
        }

        const book=await Book.create(newBook);
        return res.json({
            success:true,
            message:"Book uploaded successfully"
        })


    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Couldn't update book data in database"
        })
        

    }

}

exports.getBook=async (req,res)=>{
    try{
        const book=await Book.find({});
        return res.status(200).json({
            success:true,
            message:"Books successfully fetched",
            count:book.length,
            books:book
        })



    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Couldn't fetch book from the database"
        })

    }
}

exports.getSBook=async (req,res)=>{
    try{
        const {id}=req.params;
        const book=await Book.findById(id);
        return res.status(200).json({
            success:true,
            message:"Books successfully fetched",
            books:book
        })



    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Couldn't fetch book from the database"
        })

    }
}

exports.updateBook=async(req,res)=>{
    try{
        const {id}=req.params;
        const data=req.body;

        if(!data.title||!data.author||!data.publishYear){
            return res.status(404).json({
                success:false,
                message:"Send all the required data carefully"
            })
        }
        // data.toObject();
        // data.updatedAt=Date.now();
        const response=await Book.findByIdAndUpdate(id,data,{new:true});
        return res.status(200).json({
            success:true,
            message:"Book successfully updated",
            response:response
        })
        

    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            success:false,
            message:"Couldn't update book to the database"
        })

    }
}
exports.deleteBook=async(req,res)=>{
    try{
        const {id}=req.params;

        const response=await Book.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({
                success:false,
                message:"Book not found"
            })
        }
        res.status(200).json({
            success:true, 
            message:"Book successfully deleted"
        })



    }
    catch(err){
        console.log(err);
        return res.status(500)({
            success:false,
            message:"Error in deleting book"
        })

    }
}