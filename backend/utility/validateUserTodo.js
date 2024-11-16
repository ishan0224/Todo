import {Todo} from '../models/todo.models.js'

const validateUserTodo = async (todoId,userId)=>{
    const todo = await Todo.findById(todoId);

    if(!todo){
        throw new Error("Todo not found");
    }

    if(todo.user.toString() !== userId.toString()){
        throw new Error("You are not authorized to access this todo");
    }
    return todo;
}

export {validateUserTodo};