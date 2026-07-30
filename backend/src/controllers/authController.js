const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getAsync, runAsync } = require('../db/database');
const { JWT_SECRET, logAudit } = require('../middleware/auth');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role = 'CUSTOMER' } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
    }

    const existing = await getAsync('SELECT * FROM users WHERE email = ?', [email]);
    if (existing) {
      return res.status(400).json({ success: false, error: 'User with this email already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const userId = `usr_${Date.now()}`;
    const userRole = ['CUSTOMER', 'SELLER', 'ADMIN', 'SUPER_ADMIN'].includes(role.toUpperCase()) ? role.toUpperCase() : 'CUSTOMER';

    await runAsync(
      'INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)',
      [userId, email, password_hash, name, userRole]
    );

    const token = jwt.sign({ id: userId, email, name, role: userRole }, JWT_SECRET, { expiresIn: '7d' });
    await logAudit(userId, name, 'USER_REGISTER', `New user registered with role ${userRole}`, req.ip);

    return res.status(201).json({
      success: true,
      data: {
        token,
        user: { id: userId, email, name, role: userRole }
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = await getAsync('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    await logAudit(user.id, user.name, 'USER_LOGIN', `User logged in successfully`, req.ip);

    return res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role }
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await getAsync('SELECT id, email, name, role, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    return res.json({ success: true, data: user });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
