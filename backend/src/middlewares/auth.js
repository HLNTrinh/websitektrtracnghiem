const jwt = require('jsonwebtoken'); /* ========================= Authenticate Middleware ========================= */ 
const authenticate = (req, res, next) => { try { const authHeader = req.headers.authorization; 
  if (!authHeader) { return res.status(401).json({ message: 'Vui lòng đăng nhập', }); 
} if (!authHeader.startsWith('Bearer ')) { return res.status(401).json({ message: 'Token không hợp lệ', }); 
} const token = authHeader.split(' ')[1]; const decoded = jwt.verify( token, process.env.JWT_SECRET );
 req.user = decoded; next(); } catch (error) { return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn', });
 } }; /* ========================= Authorize Middleware ========================= */ 
 const authorize = (...roles) => { return (req, res, next) => { if (!req.user) { return res.status(401).json({ message: 'Vui lòng đăng nhập', });
 } if (!roles.includes(req.user.role)) { return res.status(403).json({ message: 'Bạn không có quyền truy cập', }); } next(); };
 };
 module.exports = { authenticate, authorize, };