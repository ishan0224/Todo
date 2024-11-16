import express from 'express'
import userRoutes from './routes/userRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import connectDB from './config/db.config.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json());
connectDB();


//routes

app.use('/api/users/',userRoutes);
app.use('/api/todos/',todoRoutes);

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

