import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

export const questionService = {
  createQuestion: (data) => api.post('/questions', data),
  getQuestions: (params) => api.get('/questions', { params }),
  getQuestion: (id) => api.get(`/questions/${id}`),
  updateQuestion: (id, data) => api.put(`/questions/${id}`, data),
  deleteQuestion: (id) => api.delete(`/questions/${id}`),
  getCategories: () => api.get('/questions/categories'),
};

export const quizService = {
  createQuiz: (data) => api.post('/quizzes', data),
  getQuizzes: (params) => api.get('/quizzes', { params }),
  getQuiz: (id) => api.get(`/quizzes/${id}`),
  updateQuiz: (id, data) => api.put(`/quizzes/${id}`, data),
  deleteQuiz: (id) => api.delete(`/quizzes/${id}`),
  publishQuiz: (id) => api.post(`/quizzes/${id}/publish`),
};

export const quizAttemptService = {
  startQuizAttempt: (quizId) => api.post(`/quiz-attempts/start/${quizId}`),
  saveAnswer: (attemptId, data) => api.post(`/quiz-attempts/${attemptId}/answer`, data),
  submitQuiz: (attemptId) => api.post(`/quiz-attempts/${attemptId}/submit`),
  getAttemptResult: (attemptId) => api.get(`/quiz-attempts/${attemptId}/result`),
  getStudentAttempts: (params) => api.get('/quiz-attempts', { params }),
};
