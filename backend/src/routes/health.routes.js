import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  const hasApiKey = process.env.OPENAI_API_KEY && 
                    process.env.OPENAI_API_KEY !== 'your_openai_api_key_here';
  
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    openai: {
      configured: hasApiKey,
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview'
    },
    message: hasApiKey ? 'All systems operational' : 'Server running but OpenAI API key not configured'
  });
});

export default router;