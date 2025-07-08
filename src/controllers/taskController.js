const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTasks = async (req, res) => {
    const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
    res.json(tasks);
};

exports.createTask = async (req, res) => {
    const { title } = req.body;
    const task = await prisma.task.create({
        data: { title, userId: req.user.id }
    });
    res.status(201).json(task);
};
