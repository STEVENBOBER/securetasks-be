const { isEmail, isStrongPassword } = require('validator');

module.exports = function validateRegistration(req, res, next) {
    const { email, password } = req.body;

    // 1) Email Format
    if (!isEmail(email || '')) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // 2) Password strength
    const ok = isStrongPassword(password || '', {
        minLength: 8,
        maxLength: 15,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    });
    if (!ok) {
        return res.status(400).json({
            message:
                'Password must be 8 to 15 chars and include uppercase, lowercase, number & symbol',
        });
    }

    next()

};