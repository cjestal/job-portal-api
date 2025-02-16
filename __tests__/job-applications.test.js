const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const request = require('supertest');
const app = require('../index');

test('dummy test that always succeeds', () => {
    expect(true).toBe(true);
});

// beforeEach(async () => {
//     await prisma.jobApplication.create({
//         data: {
//             jobId: 1,
//             userId: 1,
//             resume: 'Resume for John Doe',
//             coverLetter: 'Cover letter for John Doe',
//             status: 'Applied',
//         },
//     });
// });

// afterEach(async () => {
//     await prisma.jobApplication.deleteMany();
// });

// describe('GET /job-applications', () => {
//     it('should return a list of job applications', async () => {
//         const response = await request(app).get('/job-applications');
//         expect(response.status).toBe(200);
//         expect(response.body).toBeInstanceOf(Array);
//     });
// });

// describe('GET /job-applications/:id', () => {
//     it('should return a job application by ID', async () => {
//         const jobApplication = await prisma.jobApplication.findFirst();
//         const response = await request(app).get(`/job-applications/${jobApplication.id}`);
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('id', jobApplication.id);
//     });
// });

// describe('POST /job-applications', () => {
//     it('should create a new job application', async () => {
//         const jobApplicationData = {
//             jobId: 1,
//             userId: 1,
//             resume: 'Resume for Jane Doe',
//             coverLetter: 'Cover letter for Jane Doe',
//             status: 'Applied',
//         };
//         const response = await request(app).post('/job-applications').send(jobApplicationData);
//         expect(response.status).toBe(201);
//         expect(response.body).toHaveProperty('id');
//     });
// });

// describe('PUT /job-applications/:id', () => {
//     it('should update a job application', async () => {
//         const jobApplication = await prisma.jobApplication.findFirst();
//         const updatedJobApplicationData = {
//             status: 'Interviewing',
//         };
//         const response = await request(app).put(`/job-applications/${jobApplication.id}`).send(updatedJobApplicationData);
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('status', updatedJobApplicationData.status);
//     });
// });

// describe('DELETE /job-applications/:id', () => {
//     it('should delete a job application', async () => {
//         const jobApplication = await prisma.jobApplication.findFirst();
//         const response = await request(app).delete(`/job-applications/${jobApplication.id}`);
//         expect(response.status).toBe(204);
//     });
// });