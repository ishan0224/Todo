import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch(err){
        console.error('MongoDB Connection Failed : ', err.message);
        process.exit(1);
    }
}

export default connectDB;