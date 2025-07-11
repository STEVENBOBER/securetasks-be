const rateLimit = require('express-rate-limit');


const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
});


const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many login attempts. Try again in 10 minutes.',
});


const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,                   // allow 5 sign-up attempts per IP per hour
    message:
        'Too many accounts created from this IP, please try again after an hour.',
});

module.exports = {
    apiLimiter,
    loginLimiter,
    registerLimiter
};
