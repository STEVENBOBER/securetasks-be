const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
    const { email, password } = req.body;


    try {
        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, password: hashed }
        });

        const token = generateToken(user.id);

        res.status(201).json({ token });

    } catch (err) {
        console.error('Registration error:', err);
        return res
            .status(500)
            .json({ message: 'Something went wrong while creating your account.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user.id) });
};
