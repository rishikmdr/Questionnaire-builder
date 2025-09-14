import Joi from 'joi';

export const generateQuestionnaireSchema = Joi.object({
  hypothesis: Joi.string().min(10).max(1000).required()
    .messages({
      'string.min': 'Hypothesis must be at least 10 characters',
      'string.max': 'Hypothesis must not exceed 1000 characters',
      'any.required': 'Hypothesis is required'
    }),
  scopingAnswers: Joi.object({
    surveyLength: Joi.alternatives().try(
      Joi.number().min(3).max(60),
      Joi.string().valid('short', 'medium', 'long')
    ).default(10),
    targetRespondents: Joi.string().max(500).allow('').optional(),
    industry: Joi.string().max(100).allow('').optional(),
    brands: Joi.string().max(500).allow('').optional(),
    avoidTopics: Joi.string().max(500).allow('').optional(),
    specialInstructions: Joi.string().max(1000).allow('').optional()
  }).default({})
});

export const editQuestionSchema = Joi.object({
  question: Joi.object({
    id: Joi.string().required(),
    text: Joi.string().required(),
    type: Joi.string().required(),
    options: Joi.array().items(Joi.string()),
    logic: Joi.string().allow(null),
    required: Joi.boolean(),
    validation: Joi.object().allow(null),
    metadata: Joi.object().allow(null).optional(),
    scale: Joi.object().allow(null).optional(),
    instructions: Joi.string().allow(null, '').optional()
  }).required(),
  editInstruction: Joi.string().min(3).max(500).required()
    .messages({
      'string.min': 'Edit instruction must be at least 3 characters',
      'string.max': 'Edit instruction must not exceed 500 characters',
      'any.required': 'Edit instruction is required'
    }),
  questionnaireId: Joi.string()
});

export const validateQuestionnaireSchema = Joi.object({
  questionnaire: Joi.object({
    id: Joi.string().required(),
    sections: Joi.array().items(
      Joi.object({
        id: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string(),
        questions: Joi.array().items(
          Joi.object({
            id: Joi.string().required(),
            text: Joi.string().required(),
            type: Joi.string().required(),
            options: Joi.array().items(Joi.string()),
            logic: Joi.string().allow(null),
            required: Joi.boolean(),
            validation: Joi.object().allow(null)
          })
        ).min(1)
      })
    ).min(1)
  }).required()
});