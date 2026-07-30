const jwt = require('jsonwebtoken');
const { runAsync } = require('../db/database');

const JWT_SECRET = process.env.JWT_SECRET || 'luxecommerce_super_secret_jwt_key_2026';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Access token missing or invalid format' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Token expired or unauthorized' });
  }
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `Forbidden: Requires one of roles: [${roles.join(', ')}]`
      });
    }
    next();
  };
};

const logAudit = async (userId, userName, action, details, ipAddress = '127.0.0.1') => {
  try {
    const logId = `aud_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    await runAsync(
      `INSERT INTO audit_logs (id, user_id, user_name, action, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)`,
      [logId, userId || 'GUEST', userName || 'Guest User', action, typeof details === 'object' ? JSON.stringify(details) : details, ipAddress]
    );
  } catch (err) {
    console.error('Failed to log audit event:', err.message);
  }
};

module.exports = {
  JWT_SECRET,
  verifyToken,
  requireRole,
  logAudit
};
