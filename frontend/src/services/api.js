import axios from 'axios';

// Determine API base URL based on environment
const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.MODE === 'production'
    ? 'https://questionnaire-builder-backend-dbs1.onrender.com/api'
    : 'http://localhost:5000/api');

// Debug logs
console.log('🔧 API Base URL:', API_BASE_URL);
console.log('🔧 VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('🔧 Environment Mode:', import.meta.env.MODE);

// Fail loudly if API URL is not defined
if (!API_BASE_URL) {
  throw new Error('❌ API Base URL is not defined. Check VITE_API_URL in Vercel.');
}

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors uniformly
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
);

//
// ============================
// 📦 Questionnaires APIs
// ============================
//

// Generate a new questionnaire
export const generateQuestionnaire = async (hypothesis, scopingAnswers = {}) => {
  const response = await api.post('/questionnaire/generate', { hypothesis, scopingAnswers });
  return response.data;
};

// Edit a specific question in a questionnaire
export const editQuestion = async (question, editInstruction, questionnaireId = null) => {
  const response = await api.put(`/questionnaire/question/${question.id}`, {
    question,
    editInstruction,
    questionnaireId,
  });
  return response.data;
};

// Validate an entire questionnaire
export const validateQuestionnaire = async (questionnaire) => {
  const response = await api.post('/questionnaire/validate', { questionnaire });
  return response.data;
};

// Get a questionnaire by its ID
export const getQuestionnaire = async (id) => {
  const response = await api.get(`/questionnaire/${id}`);
  return response.data;
};

//
// ============================
// 📤 Export APIs
// ============================
//

// Export questionnaire to Word
export const exportToWord = async (questionnaireId) => {
  const response = await api.post(`/export/word/${questionnaireId}`, {}, { responseType: 'blob' });
  return response;
};

// Export questionnaire to JSON
export const exportToJSON = async (questionnaireId) => {
  const response = await api.get(`/export/json/${questionnaireId}`);
  return response.data;
};

//
// ============================
// ❤️ Health Check
// ============================
//
export const checkHealth = async () => {
  const response = await api.get('/health'); // Make sure backend has /api/health
  return response;
};

export default api;
