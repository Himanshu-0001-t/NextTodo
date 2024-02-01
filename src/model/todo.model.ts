import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({

    title : {
        type :String,
        required : [true , "Title is required"]
    },
    des : {
        type : String,
        required : [true , "description is required"]
    },

    createdBy : {
         type : String,
         required : [true , "User id Is required"]
    }

})

const Todo = mongoose.models.Todo || mongoose.model("Todo" , todoSchema)

export default Todo