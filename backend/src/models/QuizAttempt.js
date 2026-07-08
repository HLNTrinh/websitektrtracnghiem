const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
        },
        selectedOptionIndex: {
          type: Number,
          default: null,
        },
        isCorrect: {
          type: Boolean,
          default: null,
        },
        timeTaken: {
          type: Number, // giây
          default: 0,
        },
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['in_progress', 'submitted', 'timeout'],
      default: 'in_progress',
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      default: null,
    },
    timeTaken: {
      type: Number, // phút
      default: 0,
    },
    isPassed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

quizAttemptSchema.index({ studentId: 1, quizId: 1 });
quizAttemptSchema.index({ quizId: 1 });

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);