const jwt = require('jsonwebtoken');

// Middleware xác thực token
const authenticate = (req, res, next) => {
  try {
    // Header format:
    // Authorization: Bearer TOKEN

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'Vui lòng đăng nhập',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Token không tồn tại',
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Lưu thông tin user vào request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token không hợp lệ hoặc đã hết hạn',
    });
  }
};

// Middleware phân quyền
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Vui lòng đăng nhập',
      });
    }

    // Kiểm tra role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Bạn không có quyền truy cập',
      });
    }

    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};