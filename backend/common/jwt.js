import jwt from 'jsonwebtoken';
import { config } from './config.js';

export function signAccessToken(payload) {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const payload = verifyAccessToken(token);
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
