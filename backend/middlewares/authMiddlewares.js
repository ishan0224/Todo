import { config } from "dotenv";
import { User } from "../models/user.models.js";
import jwt from 'jsonwebtoken';

config();
const authMiddlewares = async (req,res,next) =>{
    const token = req.header("Authorization")?.replace("Bearer ","");
    // console.log("tok :",token);

    if(!token){
        return res.status(401).json({
            message: "No token provided Authorization denied"
        });
    }

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        // console.log("decode = ",decode);
        req.user = await User.findById(decode.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({
            message : "Invalid Token"
        });
    }
}

export {authMiddlewares};