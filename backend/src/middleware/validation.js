export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      error.isJoi = true;
      return next(error);
    }
    
    next();
  };
};