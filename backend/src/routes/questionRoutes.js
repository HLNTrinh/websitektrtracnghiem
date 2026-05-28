const express = require('express');
const {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  getCategories,
} = require('../controllers/questionController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

// Chỉ giáo viên và admin
router.post('/', authenticate, authorize('teacher', 'admin'), createQuestion);
router.get('/categories', authenticate, getCategories);
router.get('/', authenticate, authorize('teacher', 'admin'), getQuestions);
router.get('/:id', authenticate, getQuestion);
router.put('/:id', authenticate, authorize('teacher', 'admin'), updateQuestion);
router.delete('/:id', authenticate, authorize('teacher', 'admin'), deleteQuestion);

module.exports = router;
