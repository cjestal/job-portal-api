const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const request = require('supertest');
const app = require('../index');
const server = require('http');

const server = http.createServer(app.callback());

describe('User Endpoints', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany(); // Clear the users table before each test
    });

    afterAll(async () => {
        await prisma.$disconnect(); // Disconnect from the database after all tests
        server.close(); // Close the server after all tests
    });

    describe('POST /', () => {
        it('should create a new user', async () => {
            const response = await request(app).post('/users').send(data: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                phone: '123-456-7890',
                password: 'password123',
                codeName: 'johndoe123',
                type: 'INDIVIDUAL', // Assuming 'USER' is a valid UserType
            },);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('name', 'John Doe');
            expect(response.body).toHaveProperty('email', 'johndoe@example.com');
            expect(response.body).toHaveProperty('codeName', 'johndoe123');
        });

        it('should return an error for invalid data', async () => {
            const response = await request(app).post('/users').send({
                name: 'John Doe',
                email: 'invalid-email',
                password: 'password123',
            });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('GET /', () => {
        it('should return a list of users', async () => {
            await prisma.user.create({
                data: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '123-456-7890',
                    password: 'password123',
                    codeName: 'johndoe123',
                    type: 'INDIVIDUAL', // Assuming 'USER' is a valid UserType
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            const response = await request(app).get('/users');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toHaveProperty('codeName', 'johndoe123');
        });
    });

    describe('GET /:id', () => {
        it('should return a user by ID', async () => {
            const user = await prisma.user.create({
                data: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '123-456-7890',
                    password: 'password123',
                    codeName: 'johndoe123',
                    type: 'INDIVIDUAL', // Assuming 'USER' is a valid UserType
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            const response = await request(app).get(`/users/${user.id}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', user.id);
            expect(response.body).toHaveProperty('name', 'John Doe');
            expect(response.body).toHaveProperty('email', 'johndoe@example.com');
            expect(response.body).toHaveProperty('codeName', 'johndoe123');
        });

        it('should return a 404 error for an invalid ID', async () => {
            const response = await request(app).get('/users/999');

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });

    describe('PATCH /:id', () => {
        it('should update a user', async () => {
            const user = await prisma.user.create({
                data: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '123-456-7890',
                    password: 'password123',
                    codeName: 'johndoe123',
                    type: 'INDIVIDUAL', // Assuming 'USER' is a valid UserType
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            const response = await request(app).patch(`/users/${user.id}`).send({
                name: 'Jane Doe',
                codeName: 'janedoe123',
            });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', user.id);
            expect(response.body).toHaveProperty('name', 'Jane Doe');
            expect(response.body).toHaveProperty('email', 'johndoe@example.com');
            expect(response.body).toHaveProperty('codeName', 'janedoe123');
        });

        it('should return a 404 error for an invalid ID', async () => {
            const response = await request(app).patch('/users/999').send({
                name: 'Jane Doe',
            });

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });
    describe('DELETE /:id', () => {
        it('should delete a user', async () => {
            const user = await prisma.user.create({
                data: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '123-456-7890',
                    password: 'password123',
                    codeName: 'johndoe123',
                    type: 'INDIVIDUAL', // Assuming 'USER' is a valid UserType
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            const response = await request(app).delete(`/users/${user.id}`);

            expect(response.status).toBe(204);
        });

        it('should return a 404 error for an invalid ID', async () => {
            const response = await request(app).delete('/users/999');

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'User not found');
        });
    });

    describe('GET /:id/applications', () => {
        it('should return a list of user applications', async () => {
            const user = await prisma.user.create({
                data: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '123-456-7890',
                    password: 'password123',
                    codeName: 'johndoe123',
                    type: 'INDIVIDUAL', // Assuming 'USER' is a valid UserType
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            const application1 = await prisma.jobApplication.create({
                data: {
                    userId: user.id,
                    jobId: 1,
                },
            });

            const application2 = await prisma.jobApplication.create({
                data: {
                    userId: user.id,
                    jobId: 2,
                },
            });

            const response = await request(app).get(`/users/${user.id}/applications`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body).toHaveLength(2);
            expect(response.body).toContainEqual(application1);
            expect(response.body).toContainEqual(application2);
        });

        it('should return an empty list for a user with no applications', async () => {
            const user = await prisma.user.create({
                data: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '123-456-7890',
                    password: 'password123',
                    codeName: 'johndoe123',
                    type: 'INDIVIDUAL', // Assuming 'USER' is a valid UserType
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });

            const response = await request(app).get(`/users/${user.id}/applications`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body).toHaveLength(0);
        });
    });
});