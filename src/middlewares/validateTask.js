const { isLength } = require('validator');

const validateTask = (req, res, next) => {
    const { title } = req.body;

    const isLengthValid = isLength(title, { min: 1, max: 100 });

    if (!title || typeof title !== 'string' || !isLengthValid) {
        return res.status(400).json({
            message: 'Task title must be a string between 1 and 100 characters',
        });
    }

    next();
}

module.exports = validateTask