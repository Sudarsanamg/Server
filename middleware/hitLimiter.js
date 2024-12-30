
const rateLimit = require('express-rate-limit');


 const hitLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per window
    message: {
      status: 429,
      error: 'Too many login attempts from this IP. Please try again after 15 minutes.',
    },
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
  

  module.exports = hitLimiter;