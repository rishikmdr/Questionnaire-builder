import OpenAI from 'openai';
import { QUESTIONNAIRE_SYSTEM_PROMPT, EDIT_QUESTION_PROMPT } from '../prompts/systemPrompts.js';

class AIService {
  constructor() {
    this.openai = null;
    this.model = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';
  }

  initializeOpenAI() {
    if (!this.openai) {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        throw new Error('OpenAI API key is not configured. Please add your API key to backend/.env file.');
      }
      this.openai = new OpenAI({ apiKey });
    }
    return this.openai;
  }

  async generateQuestionnaire(hypothesis, scopingAnswers) {
    try {
      const openai = this.initializeOpenAI();
      const userPrompt = this.buildUserPrompt(hypothesis, scopingAnswers);
      
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: QUESTIONNAIRE_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content;
      const questionnaire = JSON.parse(content);
      
      return this.formatQuestionnaire(questionnaire, scopingAnswers);
    } catch (error) {
      console.error('Error generating questionnaire:', error);
      throw new Error('Failed to generate questionnaire');
    }
  }

  async editQuestion(question, editInstruction) {
    try {
      const openai = this.initializeOpenAI();
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: EDIT_QUESTION_PROMPT },
          { 
            role: 'user', 
            content: `Original Question: ${JSON.stringify(question)}\n\nEdit Instruction: ${editInstruction}`
          }
        ],
        temperature: 0.6,
        max_tokens: 1000,
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('Error editing question:', error);
      throw new Error('Failed to edit question');
    }
  }

  async validateQuestionnaire(questionnaire) {
    try {
      const openai = this.initializeOpenAI();
      const validationPrompt = `
        Please validate this questionnaire for:
        1. Grammar and spelling errors
        2. Biased or leading questions
        3. Logical consistency in skip patterns
        4. Double-barreled or confusing questions
        
        Return a JSON object with:
        - isValid: boolean
        - issues: array of {questionId, issue, suggestion}
        
        Questionnaire: ${JSON.stringify(questionnaire)}
      `;

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: 'You are a questionnaire validation expert.' },
          { role: 'user', content: validationPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error validating questionnaire:', error);
      throw new Error('Failed to validate questionnaire');
    }
  }

  buildUserPrompt(hypothesis, scopingAnswers) {
    // Handle both numeric and string survey length
    let surveyLengthDescription;
    let questionCount;
    let minQuestions = 20;
    let maxQuestions = 35;
    
    if (typeof scopingAnswers.surveyLength === 'number') {
      const minutes = scopingAnswers.surveyLength;
      // Calculate ~2.5 questions per minute for professional surveys
      minQuestions = Math.floor(minutes * 2);
      maxQuestions = Math.floor(minutes * 2.5);
      
      if (minutes <= 5) {
        questionCount = `${minQuestions}-${maxQuestions} questions`;
        surveyLengthDescription = `${minutes} minutes - Quick pulse survey`;
      } else if (minutes <= 10) {
        questionCount = `${minQuestions}-${maxQuestions} questions`;
        surveyLengthDescription = `${minutes} minutes - Standard research study`;
      } else if (minutes <= 15) {
        questionCount = `${minQuestions}-${maxQuestions} questions`;
        surveyLengthDescription = `${minutes} minutes - Detailed market research`;
      } else if (minutes <= 20) {
        questionCount = `${minQuestions}-${maxQuestions} questions`;
        surveyLengthDescription = `${minutes} minutes - Comprehensive study`;
      } else {
        questionCount = `${minQuestions}-${maxQuestions} questions MINIMUM`;
        surveyLengthDescription = `${minutes} minutes - Deep-dive research`;
      }
    } else {
      // Fallback for string values
      surveyLengthDescription = scopingAnswers.surveyLength || 'Medium (10 minutes)';
      questionCount = '25-35 questions';
    }

    return `
      RESEARCH BRIEF:
      Primary Research Objective: ${hypothesis}
      
      TARGET SPECIFICATIONS:
      - Survey Duration: ${surveyLengthDescription}
      - Question Count: ${questionCount}
      - Target Respondents: ${scopingAnswers.targetRespondents || 'General population 18-65, nationally representative'}
      - Industry Context: ${scopingAnswers.industry || 'Cross-industry'}
      - Key Brands/Competitors for Benchmarking: ${scopingAnswers.brands || 'Category leaders'}
      - Sensitive Topics to Avoid: ${scopingAnswers.avoidTopics || 'None specified'}
      - Client-Specific Requirements: ${scopingAnswers.specialInstructions || 'Standard professional research guidelines'}
      
      DELIVERABLE REQUIREMENTS:
      Generate a PROFESSIONAL, SOPHISTICATED questionnaire that:
      
      1. MEETS FORTUNE 500 STANDARDS
         - Use advanced question types (MaxDiff, Conjoint, Semantic Differential)
         - Include validated psychometric scales
         - Apply behavioral economics principles
         - Implement proper randomization and rotation
      
      2. FOLLOWS BEST PRACTICES
         - Include quality control questions
         - Add attention checks and trap questions
         - Use professional skip logic and branching
         - Ensure mobile optimization considerations
      
      3. DELIVERS ACTIONABLE INSIGHTS
         - Questions that drive business decisions
         - Metrics that can be benchmarked
         - Data suitable for advanced analytics
         - Segmentation and profiling capabilities
      
      4. MAINTAINS RESPONDENT ENGAGEMENT
         - Vary question types to prevent fatigue
         - Use clear, professional language
         - Include progress indicators notes
         - Professional instructions and transitions
      
      CRITICAL REQUIREMENTS:
      1. MUST generate EXACTLY ${questionCount} (no less!)
      2. MANDATORY sections with minimum questions:
         - Screener: 5-8 questions with termination logic
         - Demographics: 8-10 comprehensive questions
         - Main research: Remaining questions to reach total count
      3. Questions must be at McKinsey/BCG/Bain consultant level
      4. Every question must yield strategic, actionable insights
      5. NO basic or amateur formulations
      
      IMPORTANT: You MUST generate ${questionCount} total questions.
      
      Return as a structured JSON object with all required fields.
    `;
  }

  formatQuestionnaire(rawQuestionnaire, scopingAnswers) {
    // Ensure consistent structure
    const formatted = {
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      sections: [],
      metadata: {
        totalQuestions: 0,
        estimatedTime: typeof scopingAnswers?.surveyLength === 'number' 
          ? `${scopingAnswers.surveyLength} minutes` 
          : '10 minutes'
      }
    };

    // Process sections and questions
    if (rawQuestionnaire.sections) {
      formatted.sections = rawQuestionnaire.sections.map(section => ({
        id: this.generateId(),
        title: section.title,
        description: section.description,
        questions: section.questions.map(q => this.formatQuestion(q))
      }));
    }

    // Calculate total questions
    formatted.metadata.totalQuestions = formatted.sections.reduce(
      (total, section) => total + section.questions.length, 
      0
    );

    return formatted;
  }

  formatQuestion(question) {
    return {
      id: this.generateId(),
      text: question.text || question.question,
      type: question.type || 'single',
      required: question.required !== false,
      logic: question.logic || null,
      options: question.options || [],
      validation: question.validation || null,
      metadata: {
        editable: true,
        position: question.position || 0
      }
    };
  }

  generateId() {
    return `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default new AIService();