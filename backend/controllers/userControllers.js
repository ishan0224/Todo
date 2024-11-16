import dotenv from 'dotenv';
import {User} from '../models/user.models.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const signup = async (req,res) =>{
    const {username , email, password} = req.body;

    try{
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message: 'User already exist'
            });
        }

        const newUser = new User({
            username,
            email,
            password,
        });

        await newUser.save();

        const token = jwt.sign({id : newUser._id},
            process.env.JWT_SECRET,{expiresIn : '1d'});

        res.status(201).json({
            message: 'User Created Successfully',
            user : newUser,
            token : token 
        })
    }
    catch(err){
        res.status(500).json({
            message: 'Error creating user',
            error: err.message
        })
    }
};
//input email pass
// check for it in db if yes then validate them else through error
// after validating generate token
const login = async (req,res)=>{
    
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message : "invalid credentials"});
        }

        const isMatch = await user.isPasswordMatch(password);
        if(!isMatch){
            return res.status(400).json({message : "invalid credentials"});
        }
        
       const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
       res.status(200).json({messgae : "Login Successfull",token : token});
    }
    catch(error){
        res.status(500).json({message: "Error loggin in", error : error.message});
    }   
}

export {signup , login};