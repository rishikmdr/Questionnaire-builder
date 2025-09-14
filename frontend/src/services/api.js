import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Request made but no response
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred');
    }
  }
);

// Questionnaire APIs
export const generateQuestionnaire = async (hypothesis, scopingAnswers) => {
  const response = await api.post('/questionnaire/generate', {
    hypothesis,
    scopingAnswers,
  });
  return response.data;
};

export const editQuestion = async (question, editInstruction, questionnaireId = null) => {
  const response = await api.put(`/questionnaire/question/${question.id}`, {
    question,
    editInstruction,
    questionnaireId
  });
  return response.data;
};

export const validateQuestionnaire = async (questionnaire) => {
  const response = await api.post('/questionnaire/validate', {
    questionnaire,
  });
  return response.data;
};

export const getQuestionnaire = async (id) => {
  const response = await api.get(`/questionnaire/${id}`);
  return response.data;
};

// Export APIs
export const exportToWord = async (questionnaireId) => {
  const response = await api.post(
    `/export/word/${questionnaireId}`,
    {},
    {
      responseType: 'blob',
    }
  );
  return response;
};

export const exportToJSON = async (questionnaireId) => {
  const response = await api.get(`/export/json/${questionnaireId}`);
  return response.data;
};

// Health check
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response;
};

export default api;