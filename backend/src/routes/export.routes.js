import express from 'express';
import { exportToWord, exportToJSON } from '../controllers/export.controller.js';

const router = express.Router();

// Export questionnaire as Word document
router.post('/word/:questionnaireId', exportToWord);

// Export questionnaire as JSON
router.get('/json/:questionnaireId', exportToJSON);

export default router;