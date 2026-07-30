// In-memory rate limiter middleware for DDOS & Brute Force protection
const requestsMap = new Map();

const rateLimiter = (options = { windowMs: 15 * 60 * 1000, max: 100 }) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || '127.0.0.1';
    const now = Date.now();

    if (!requestsMap.has(ip)) {
      requestsMap.set(ip, []);
    }

    const timestamps = requestsMap.get(ip).filter((time) => now - time < options.windowMs);
    timestamps.push(now);
    requestsMap.set(ip, timestamps);

    if (timestamps.length > options.max) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests from this IP. Please try again later.'
      });
    }

    next();
  };
};

module.exports = rateLimiter;
