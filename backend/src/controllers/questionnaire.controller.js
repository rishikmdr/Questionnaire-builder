import aiService from '../services/ai.service.js';
import { QuestionnaireStore } from '../services/store.service.js';
import { validateHypothesis } from '../utils/validation.utils.js';

export const generateQuestionnaire = async (req, res, next) => {
  try {
    const { hypothesis, scopingAnswers } = req.body;
    
    // Validate hypothesis for meaningful content
    const validation = validateHypothesis(hypothesis);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
        error: 'INVALID_HYPOTHESIS'
      });
    }
    
    // Generate questionnaire using AI
    const questionnaire = await aiService.generateQuestionnaire(hypothesis, scopingAnswers);
    
    // Store questionnaire in memory (in production, use database)
    QuestionnaireStore.save(questionnaire);
    
    res.status(201).json({
      success: true,
      data: questionnaire,
      message: 'Questionnaire generated successfully'
    });
  } catch (error) {
    if (error.message.includes('OpenAI API key')) {
      return res.status(503).json({
        success: false,
        message: 'AI service not configured. Please add your OpenAI API key to backend/.env file.',
        error: 'OPENAI_NOT_CONFIGURED'
      });
    }
    next(error);
  }
};

export const editQuestion = async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const { question, editInstruction, questionnaireId } = req.body;
    
    // Edit question using AI
    const editedQuestion = await aiService.editQuestion(question, editInstruction);
    
    // Update questionnaire in store
    if (questionnaireId) {
      const questionnaire = QuestionnaireStore.get(questionnaireId);
      if (questionnaire) {
        // Find and update the question
        questionnaire.sections.forEach(section => {
          const qIndex = section.questions.findIndex(q => q.id === questionId);
          if (qIndex !== -1) {
            section.questions[qIndex] = { ...editedQuestion, id: questionId };
          }
        });
        QuestionnaireStore.save(questionnaire);
      }
    }
    
    res.json({
      success: true,
      data: editedQuestion,
      message: 'Question edited successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const validateQuestionnaire = async (req, res, next) => {
  try {
    const { questionnaire } = req.body;
    
    // Validate questionnaire using AI
    const validation = await aiService.validateQuestionnaire(questionnaire);
    
    res.json({
      success: true,
      data: validation,
      message: 'Validation completed'
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestionnaire = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const questionnaire = QuestionnaireStore.get(id);
    
    if (!questionnaire) {
      return res.status(404).json({
        success: false,
        message: 'Questionnaire not found'
      });
    }
    
    res.json({
      success: true,
      data: questionnaire
    });
  } catch (error) {
    next(error);
  }
};