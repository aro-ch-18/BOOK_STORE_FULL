const mongoose=require('mongoose');

const bookSchema=mongoose.Schema(
    {
        title:{
            type: String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
        publishYear:{
            type:String,
            required:true,
        }

    },
    {
        timestamps:true,
    }

);

// export const 
module.exports = mongoose.model("Book", bookSchema);