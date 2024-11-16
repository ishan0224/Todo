import express from 'express';
import {createTodos , getTodos, editTodos, checkTodo, deleteTodo} from '../controllers/todoControllers.js'
import { authMiddlewares } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post('/create', authMiddlewares, createTodos);
router.get('/', authMiddlewares, getTodos);
router.put('/edit/:id', authMiddlewares, editTodos);
router.put('/check/:id', authMiddlewares, checkTodo);
router.delete('/delete/:id',authMiddlewares,deleteTodo);

export default router;