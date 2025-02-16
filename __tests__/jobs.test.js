const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const request = require('supertest');
// const app = require('../index'); // Import your Koa app instance

test('dummy test that always succeeds', () => {
    expect(true).toBe(true);
});

// beforeEach(async () => {
//     await prisma.job.create({
//         data: {
//             title: 'Software Engineer',
//             description: 'Develop software applications',
//             requirements: 'Bachelor\'s degree in Computer Science',
//             companyId: 1,
//         },
//     });
// });

// afterEach(async () => {
//     await prisma.job.deleteMany();
//     await prisma.$disconnect(); // Disconnect from the database after all tests
// });

// describe('GET /jobs', () => {
//     it('should return a list of jobs', async () => {
//         const response = await request(app).get('/jobs');
//         expect(response.status).toBe(200);
//         expect(response.body).toBeInstanceOf(Array);
//     });
// });

// describe('GET /jobs/:id', () => {
//     it('should return a job by ID', async () => {
//         const job = await prisma.job.findFirst();
//         const response = await request(app).get(`/jobs/${job.id}`);
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('id', job.id);
//     });
// });

// describe('POST /jobs', () => {
//     it('should create a new job', async () => {
//         const jobData = {
//             title: 'Data Scientist',
//             description: 'Analyze data and develop models',
//             requirements: 'Master\'s degree in Data Science',
//             companyId: 1,
//         };
//         const response = await request(app).post('/jobs').send(jobData);
//         expect(response.status).toBe(201);
//         expect(response.body).toHaveProperty('id');
//     });
// });

// describe('PUT /jobs/:id', () => {
//     it('should update a job', async () => {
//         const job = await prisma.job.findFirst();
//         const updatedJobData = {
//             title: 'Software Engineer Updated',
//         };
//         const response = await request(app).put(`/jobs/${job.id}`).send(updatedJobData);
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('title', updatedJobData.title);
//     });
// });

// describe('DELETE /jobs/:id', () => {
//     it('should delete a job', async () => {
//         const job = await prisma.job.findFirst();
//         const response = await request(app).delete(`/jobs/${job.id}`);
//         expect(response.status).toBe(204);
//     });
// });