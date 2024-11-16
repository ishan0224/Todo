import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import { hash } from 'crypto';

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
    },
    password :{
        type : String,
        required : true,
    }
},{timestamps : true});

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next();
    }  
    try{
        this.password = await hash(this.password,10);
        next();
    }
    catch(error){
        next(error);
    }   
})

userSchema.methods.isPasswordMatch = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword,this.password);
};


export const User = mongoose.model('User',userSchema);