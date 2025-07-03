import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB(); // Connect to MongoDB
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// api endpoint
app.use('/api/user',userRouter)

// API Routes
app.get('/', (req, res) => {
  res.send("API working");
});

// Start Server
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
