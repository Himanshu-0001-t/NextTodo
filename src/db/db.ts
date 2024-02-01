import mongoose from "mongoose";

export const connectDB = async () =>{
     try {

         mongoose.connect("mongodb://localhost:27017/todoapp");
         const connection = mongoose.connection;

         connection.on("connect" , () =>{
             console.log("MongoDB Connected Successfully")
         })

          connection.on("error" , () =>{
             console.log("Error in connecting to database");
         })
            
     } catch (error : any) {
            console.log("Database Connection Faild" , error.message)
     }
}