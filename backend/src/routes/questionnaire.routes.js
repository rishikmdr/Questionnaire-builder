import express from 'express';
import { 
  generateQuestionnaire,
  editQuestion,
  validateQuestionnaire,
  getQuestionnaire
} from '../controllers/questionnaire.controller.js';
import { validateRequest } from '../middleware/validation.js';
import { 
  generateQuestionnaireSchema,
  editQuestionSchema,
  validateQuestionnaireSchema
} from '../validators/questionnaire.validators.js';

const router = express.Router();

// Generate new questionnaire
router.post(
  '/generate',
  validateRequest(generateQuestionnaireSchema),
  generateQuestionnaire
);

// Edit a specific question
router.put(
  '/question/:questionId',
  validateRequest(editQuestionSchema),
  editQuestion
);

// Validate entire questionnaire
router.post(
  '/validate',
  validateRequest(validateQuestionnaireSchema),
  validateQuestionnaire
);

// Get questionnaire by ID
router.get('/:id', getQuestionnaire);

export default router;