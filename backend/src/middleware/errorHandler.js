export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Joi validation errors
  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  // OpenAI API errors
  if (err.response && err.response.status) {
    return res.status(err.response.status).json({
      success: false,
      message: err.message || 'AI service error',
      error: process.env.NODE_ENV === 'development' ? err.response.data : undefined
    });
  }

  // Default error
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};