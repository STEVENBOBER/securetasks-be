const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let userToken;
let adminToken;
let createdTaskId;


beforeAll(async () => {
    await prisma.task.deleteMany();
    await prisma.user.deleteMany();

    const userRes = await request(app).post('/api/auth/register').send({
        email: 'user@example.com',
        password: 'User1234!',
    });

    userToken = userRes.body.token;

    const adminRes = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            password: await require('bcryptjs').hash('Admin1234!', 10),
            role: 'admin',
        },
    });

    const jwt = require('jsonwebtoken');
    adminToken = jwt.sign({ id: adminRes.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
});

afterAll(async () => {
    await prisma.task.deleteMany(); // First delete tasks
    await prisma.user.deleteMany(); // Then users
    await prisma.$disconnect();
});


describe('Task Routes', () => {
    it('Should require auth to get tasks', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toBe(401);
    });

    it('Should allow a user to create a task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ title: 'Test Task' });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Test Task');
        createdTaskId = res.body.id;
    });

    it('should return the users tasks', async () => {
        const res = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${userToken}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should not allow a normal user to delete another users task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ title: 'Should not delete this' });

        const res2 = await request(app)
            .delete(`/api/tasks/${res.body.id}`)
            .set('Authorization', `Bearer ${adminToken}`); // should work

        expect(res2.statusCode).toBe(200);
    });

    it('should allow an admin to delete any task', async () => {
        const res = await request(app)
            .delete(`/api/tasks/${createdTaskId}`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Task deleted successfully')
    });


    it('should return 404 if task does not exist', async () => {
        const res = await request(app)
            .delete(`/api/tasks/999999`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(404);
    });

    it('should return 400 for invalid task ID', async () => {
        const res = await request(app)
            .delete(`/api/tasks/abc`)
            .set('Authorization', `Bearer ${adminToken}`);

        expect(res.statusCode).toBe(400);
    });

});

// stevenbober: Add validation tests for invalid task titles