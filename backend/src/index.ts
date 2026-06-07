import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Imports
import invitationRoutes from './routes/invitationRoutes';
import templateRoutes from './routes/templateRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import rsvpRoutes from './routes/rsvpRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { apiLimiter } from './middlewares/rateLimiter';
import { seedDefaultTemplates } from './controllers/templateController';
import { startCleanupService } from './services/cleanupService';

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback to allowing in development, or adjust as needed
    }
  },
  credentials: true
}));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Images Statically
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Apply general API Rate Limiter
app.use('/api/', apiLimiter);

// API Routes
app.use('/api/invitations', invitationRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/rsvps', rsvpRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'InviteHub Server is healthy' });
});

// Global Error Handler
app.use(errorMiddleware);

// MongoDB Connection and Server Initialization
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('CRITICAL: MONGODB_URI environment variable is missing.');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log('Successfully connected to MongoDB Atlas.');
    
    // Seed default templates
    await seedDefaultTemplates();
    
    // Start automatic cleanup background service
    startCleanupService();

    // Start listening
    app.listen(PORT, () => {
      console.log(`[InviteHub Server] Running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB Atlas:', err);
    process.exit(1);
  });
