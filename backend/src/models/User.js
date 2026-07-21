const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
<<<<<<< HEAD
      trim: true,
    },
=======
    },

>>>>>>> main
    email: {
      type: String,
      required: true,
      unique: true,
<<<<<<< HEAD
      lowercase: true,
      trim: true,
    },
=======
    },

>>>>>>> main
    password: {
      type: String,
      required: true,
      select: false,
    },
<<<<<<< HEAD
=======

>>>>>>> main
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
    },
<<<<<<< HEAD
=======

>>>>>>> main
    status: {
      type: String,
      enum: ['active', 'inactive', 'blocked'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
module.exports = mongoose.model('User', userSchema);
=======
const User = mongoose.model('User', userSchema);

module.exports = User;
>>>>>>> main
