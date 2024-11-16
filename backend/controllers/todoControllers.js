import { Todo } from "../models/todo.models.js";
import { User } from "../models/user.models.js";
import { validateUserTodo } from "../utility/validateUserTodo.js";



const createTodos = async(req,res) =>{

    const {title, description, checkbox} = req.body;
    const user = req.user._id;

    try {
        const userExists = await User.findById(user);

        if(!userExists){
            return res.status(404).json({
                message : "User does not exist"
            })
        }
        
        const newTodo = new Todo({
            user,
            title,
            description,
            checkbox
        });
        await newTodo.save();

        return res.status(201).json({
            message : "Todo Created",
            todo: newTodo
        })
        
    } catch (error) {
        res.status(500).json({
            message : "Error creating Todo",
            error : error.message
        });
    }
}

const getTodos = async (req,res) =>{
    try {
        const userId = req.user._id;

        const todos = await Todo.find({user : userId}).select('title description checkbox').lean();

        if(!todos || todos.length === 0){
            return res.status(404).json({
                message : "No Todos found for the user"
            });
        };

        return res.status(200).json({
            message : "All todos retrived successfully",
            todos : todos
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message : "Error fetching todos",
            error: error.message
        })
    }
}

const editTodos = async (req,res)=>{
    const {title,description,checkbox} = req.body;
    const userId = req.user._id;
    const todoId = req.params.id;


    try {
        // const todo = await Todo.findById(todoId);

        // if(!todo){
        //     return res.status(404).json({
        //         message : "Todo not found"
        //     })
        // }

        // if(todo.user.toString() !== userId.toString()){
        //    return res.status(403).json({
        //         message : "You are not authorized to edit this todo"
        //     })
        // } 
        // made a function to reuse the above code 

        const todo = await validateUserTodo(todoId,userId);

        const updateFields = {};

        if(title !== undefined) updateFields.title = title;
        if(description !== undefined) updateFields.description = description;
        if(checkbox !== undefined) updateFields.checkbox = checkbox;

        const editedTodo = await Todo.findByIdAndUpdate(
            todo._id,
            updateFields,
            {new : true}
        ).lean()

        return res.status(200).json({
            messgae : "Todo updated successfully",
            todo : editedTodo
        })
    } catch (error) {
        console.error(error);
        res.status(error.message === "Todo not found" ? 404 : 403).json({
            messgae : "Error editing todo",
            error : error.message
        })
    }
}

const checkTodo = async (req,res)=>{
    const userId = req.user._id;
    const todoId = req.params.id;
    const {checkbox} = req.body;

    try {
        const todo = await validateUserTodo(todoId,userId);

        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { 
                title : todo.title,
                description : todo.description,
                checkbox
            },
            {new : true}
        ).lean();

        return res.status(200).json({
            message : checkbox == true ? "Task Completed" : "Task updated successfully"
        })

        
    } catch (error) {
        console.error(error);
        res.status(error.message === "Todo not found" ? 404 : 403).json({
            message : "Error ticking the checkbox",
            error : error.message
        })
    }
}

const deleteTodo = async(req,res)=>{
    const userId = req.user._id;
    const todoId = req.params.id;

    try {
        const todo = await validateUserTodo(todoId,userId);

        await Todo.findByIdAndDelete(todo._id).lean();
        return res.status(200).json({
            message : "Todo deleted Successfully",
            deletedTodo : todo
        })
    } catch (error) {
        console.error(error);
        return res.status(error.message === "Todo not found" ? 404 : 403).json({
            message: "Error deleting the Todo",
            error: error.message,
        });
    }
}
export {createTodos, getTodos, editTodos, checkTodo, deleteTodo};