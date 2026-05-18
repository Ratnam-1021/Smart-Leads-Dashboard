import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes';
import leadRoutes from './src/routes/leadRoutes';
import { errorHandler, notFound } from './src/middleware/errorMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Centralized Error Handling
app.use(notFound);
app.use(errorHandler);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smartleads';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1);
  });
