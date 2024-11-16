import express from "express";
import { login, signup } from "../controllers/userControllers.js";
import { authMiddlewares } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);


export default router;