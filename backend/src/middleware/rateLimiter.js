import rateLimit from "express-rate-limit";

export const createRateLimiter = (options) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000, // default: 15 min
    max: options.max || 5, // limit each IP
    message: {
      error: "Too many requests. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};
