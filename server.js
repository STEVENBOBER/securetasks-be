const express = require('express');
const helmet = require('helmet');

const { apiLimiter } = require('./src/middlewares/rateLimiter');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();

// app.use(helmet.contentSecurityPolicy.getDefaultDirectives());
app.use(helmet());
app.use('/api/', apiLimiter);

app.use(express.json());

app.get('/', (req, res) => res.send('SecureTasks API'));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))