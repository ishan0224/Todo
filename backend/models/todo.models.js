import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    checkbox:{
        type : Boolean,
        default: false
    }
},{timestamps : true});

export const Todo = mongoose.model('Todo',todoSchema);