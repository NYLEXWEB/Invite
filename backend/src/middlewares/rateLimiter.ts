import rateLimit from 'express-rate-limit';

// Standard API rate limiter: max 100 requests per 15 minutes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Invitation creation rate limiter (stricter): max 15 creations per hour per IP to prevent spamming
export const creationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15,
  message: {
    success: false,
    message: 'Too many invitations created from this IP. Limit is 15 per hour.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
