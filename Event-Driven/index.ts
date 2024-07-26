import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// MongoDB connection
const url: string = process.env.MONGO_URL || '';
mongoose.connect(url).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.log(err);
});

  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

