const express = require('express');
const helmet = require('helmet');
const { apiLimiter } = require('./src/middlewares/rateLimiter');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();

app.use(helmet());
app.use('/api/', apiLimiter);

app.use(express.json());

app.get('/', (req, res) => res.send('SecureTasks API'));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;