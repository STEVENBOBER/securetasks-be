const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'User not found' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } })

        if (!user) return res.sendStatus(401);

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        next();
    } catch (err) {
        console.error('Token error:', err);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' })
        }

        res.status(403).json({ message: 'Invalid token' });
    }

};

module.exports = protect;