const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Vui lòng nhập nội dung câu hỏi'],
      minlength: [5, 'Câu hỏi quá ngắn'],
    },
    options: [
      {
        text: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          default: false,
        },
      },
    ],
    category: {
      type: String,
      required: true,
      enum: ['Math', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'English', 'Other'],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    explanation: {
      type: String,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Validate: phải có 4 đáp án, 1 đáp án đúng
questionSchema.pre('save', function (next) {
  if (this.options.length !== 4) {
    throw new Error('Câu hỏi phải có đúng 4 đáp án');
  }
  const correctCount = this.options.filter(opt => opt.isCorrect).length;
  if (correctCount !== 1) {
    throw new Error('Phải có đúng 1 đáp án đúng');
  }
  next();
});

module.exports = mongoose.model('Question', questionSchema);
