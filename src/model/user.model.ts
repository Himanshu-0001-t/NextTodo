import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Name is required"]
    }, 
    email : {
        type : String,
        required : [true , "Email is required"],
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : "Todo"
    }

})

const User = mongoose.models.User || mongoose.model("User" , userschema);

export default User;
