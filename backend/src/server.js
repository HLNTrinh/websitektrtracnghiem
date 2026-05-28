require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

/* =========================
   Middleware
========================= */
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   MongoDB Connection
========================= */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    await mongoose.connect(mongoUri);

    console.log('✅ Connected to MongoDB');
    console.log(`📍 Database: ${mongoUri}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

connectDB();

/* =========================
   Root Route
========================= */
app.get('/', (req, res) => {
  res.send('🚀 Exam System API is running...');
});

/* =========================
   Health Check
========================= */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'Backend is running!',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development',
  });
});

/* =========================
   Routes
========================= */
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/quiz-attempts', require('./routes/quizAttemptRoutes'));

/* =========================
   404 Handler
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

/* =========================
   Global Error Handler
========================= */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error:
      process.env.NODE_ENV === 'development'
        ? err.message
        : undefined,
  });
});

/* =========================
   Start Server
========================= */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📌 API URL: http://localhost:${PORT}/api`);
});

module.exports = app;