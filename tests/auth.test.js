const request = require('supertest');
const app = require('../app');


describe('Auth Routes', () => {
    const testEmail = `user${Date.now()}@example.com`
    const testPassword = 'Test#02151996'

    it('Should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: testEmail, password: testPassword });

        expect(res.statusCode).toBe(201);
        expect(res.body.token).toBeDefined();
    })

    it('Should fail with a weak password', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: 'weak@example.com', password: '123' });

        expect(res.statusCode).toBe(400);
    })
});