import mongoose from "mongoose";


export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI,{
            dbName: "TodoData"
        })
        console.log("DataBase Connected");
    }
    catch(e){
        console.log("Database Connection error:", e);
    }
}
