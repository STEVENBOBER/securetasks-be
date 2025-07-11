const express = require('express');
const { register, login } = require('../controllers/authController');
const { loginLimiter, registerLimiter } = require('../middlewares/rateLimiter');
const validateRegistration = require('../middlewares/validateRegistration');
const router = express.Router();

router.post('/register',
    registerLimiter,
    validateRegistration,
    register
);

router.post('/login',
    loginLimiter,
    login
);

module.exports = router