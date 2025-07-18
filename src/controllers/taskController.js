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

exports.deleteTask = async (req, res) => {
    const taskId = parseInt(req.params.id);

    if (isNaN(taskId)) {
        return res.status(400).json({ message: 'Invalid task ID' });
    }

    try {
        const task = await prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }


        if (req.user.role !== 'admin' && task.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: Not your task' });
        }

        await prisma.task.delete({
            where: { id: taskId },
        });

        res.status(200).json({ message: 'Task deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });

    }

};

// stevenbober: Write updateTask when FE is built out