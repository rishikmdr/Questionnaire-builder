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

// 1️⃣ Generate new questionnaire
router.post(
  '/generate',
  validateRequest(generateQuestionnaireSchema),
  generateQuestionnaire
);

// 2️⃣ Edit a specific question
router.put(
  '/question/:questionId',
  validateRequest(editQuestionSchema),
  editQuestion
);

// 3️⃣ Validate entire questionnaire
router.post(
  '/validate',
  validateRequest(validateQuestionnaireSchema),
  validateQuestionnaire
);

// 4️⃣ Get a questionnaire by ID
router.get('/:id', getQuestionnaire);

export default router;
