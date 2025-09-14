export const validateHypothesis = (hypothesis) => {
  if (!hypothesis || typeof hypothesis !== 'string') {
    return { isValid: false, error: 'Hypothesis is required' };
  }

  const cleaned = hypothesis.trim();
  
  // Check minimum length
  if (cleaned.length < 20) {
    return { isValid: false, error: 'Hypothesis must be at least 20 characters long' };
  }

  // Check for junk input patterns
  const junkPatterns = [
    /^[^a-zA-Z]*$/,  // No letters at all
    /^(.)\1{5,}/,     // Same character repeated many times
    /^[a-zA-Z]{1,3}$/,  // Too short to be meaningful
    /^[\d\s\W]+$/,    // Only numbers, spaces, or special characters
    /^(test|asdf|qwer|zxcv|demo|sample|example|abc|xyz|123|aaa|bbb)/i,  // Common test inputs
  ];

  for (const pattern of junkPatterns) {
    if (pattern.test(cleaned)) {
      return { 
        isValid: false, 
        error: 'Please provide a meaningful research hypothesis or problem statement' 
      };
    }
  }

  // Check for minimum word count (at least 3 meaningful words)
  const words = cleaned.split(/\s+/).filter(word => word.length > 2);
  if (words.length < 3) {
    return { 
      isValid: false, 
      error: 'Hypothesis must contain at least 3 meaningful words' 
    };
  }

  // Check for presence of research-related keywords (at least one should be present)
  const researchKeywords = [
    'understand', 'evaluate', 'assess', 'measure', 'analyze', 'determine',
    'identify', 'explore', 'investigate', 'study', 'research', 'test',
    'compare', 'examine', 'discover', 'brand', 'customer', 'user', 'market',
    'consumer', 'product', 'service', 'satisfaction', 'awareness', 'perception',
    'behavior', 'attitude', 'preference', 'experience', 'performance',
    'quality', 'loyalty', 'engagement', 'adoption', 'usage', 'need', 'want'
  ];

  const hasResearchContext = researchKeywords.some(keyword => 
    cleaned.toLowerCase().includes(keyword)
  );

  if (!hasResearchContext) {
    return { 
      isValid: false, 
      error: 'Please describe what you want to research, measure, or understand' 
    };
  }

  // Check for excessive special characters
  const specialCharCount = (cleaned.match(/[^a-zA-Z0-9\s]/g) || []).length;
  if (specialCharCount > cleaned.length * 0.3) {
    return { 
      isValid: false, 
      error: 'Hypothesis contains too many special characters' 
    };
  }

  return { isValid: true };
};

export const validateScopingAnswers = (scopingAnswers) => {
  const errors = [];

  // Validate survey length
  if (scopingAnswers.surveyLength) {
    if (typeof scopingAnswers.surveyLength === 'number') {
      if (scopingAnswers.surveyLength < 3 || scopingAnswers.surveyLength > 60) {
        errors.push('Survey length must be between 3 and 60 minutes');
      }
    }
  }

  // Validate target respondents if provided
  if (scopingAnswers.targetRespondents && scopingAnswers.targetRespondents.trim()) {
    if (scopingAnswers.targetRespondents.trim().length < 5) {
      errors.push('Target respondents description is too short');
    }
  }

  return errors.length > 0 ? { isValid: false, errors } : { isValid: true };
};