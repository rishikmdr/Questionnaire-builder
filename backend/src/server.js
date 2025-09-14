import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler.js';
import questionnaireRoutes from './routes/questionnaire.routes.js';
import exportRoutes from './routes/export.routes.js';
import healthRoutes from './routes/health.routes.js';

// Load environment variables
dotenv.config();

const app = express();
// Render provides the PORT environment variable
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    // Allowed origins
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      process.env.FRONTEND_URL,
      // Add your Vercel URL here
      'https://ai-questionnaire-builder.vercel.app',
      // Allow all Vercel preview deployments
      /https:\/\/.*\.vercel\.app$/,
    ].filter(Boolean);
    
    // Check if the origin is allowed
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api/questionnaire', questionnaireRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/health', healthRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Questionnaire Builder API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      questionnaire: '/api/questionnaire',
      export: '/api/export'
    }
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
});