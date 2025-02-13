const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const request = require('supertest');
const app = require('../index');

beforeEach(async () => {
    await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
        },
    });
});

afterEach(async () => {
    await prisma.user.deleteMany();
});

describe('GET /users', () => {
    it('should return a list of users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
        const user = await prisma.user.findFirst();
        const response = await request(app).get(`/users/${user.id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', user.id);
    });
});

describe('POST /users', () => {
    it('should create a new user', async () => {
        const userData = {
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            password: 'password456',
        };
        const response = await request(app).post('/users').send(userData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });
});

describe('PUT /users/:id', () => {
    it('should update a user', async () => {
        const user = await prisma.user.findFirst();
        const updatedUserData = {
            name: 'John Doe Updated',
        };
        const response = await request(app).put(`/users/${user.id}`).send(updatedUserData);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', updatedUserData.name);
    });
});

describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
        const user = await prisma.user.findFirst();
        const response = await request(app).delete(`/users/${user.id}`);
        expect(response.status).toBe(204);
    });
});