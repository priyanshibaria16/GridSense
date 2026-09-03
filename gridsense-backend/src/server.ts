import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import apiRouter from './routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*' }));
app.use(express.json());

// Rate Limiting (100 requests per minute)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests to GridSense API Gateway. Please try again shortly.' }
});
app.use('/api', limiter);

// Mount API Gateway Router
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'GridSense AI Gateway',
    timestamp: new Date().toISOString(),
    gridFrequencyHz: 50.02
  });
});

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`⚡ GridSense AI Backend API Gateway running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});

export default app;
