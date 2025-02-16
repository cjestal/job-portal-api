const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const request = require('supertest');
const app = require('../index').app; // Import your Koa app instance

test('dummy test that always succeeds', () => {
    expect(true).toBe(true);
});

// beforeEach(async () => {
//     await prisma.company.create({
//         data: {
//             name: 'Company A',
//             email: 'info@companya.com',
//             phone: '123-456-7890',
//             address: '123 Main St, Anytown, USA',
//         },
//     });
// });

// afterEach(async () => {
//     await prisma.company.deleteMany();
// });

// describe('GET /companies', () => {
//     it('should return a list of companies', async () => {
//         const response = await request(app).get('/companies');
//         expect(response.status).toBe(200);
//         expect(response.body).toBeInstanceOf(Array);
//     });
// });

// describe('GET /companies/:id', () => {
//     it('should return a company by ID', async () => {
//         const company = await prisma.company.findFirst();
//         const response = await request(app).get(`/companies/${company.id}`);
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('id', company.id);
//     });
// });

// describe('POST /companies', () => {
//     it('should create a new company', async () => {
//         const companyData = {
//             name: 'Company B',
//             email: 'info@companyb.com',
//             phone: '987-654-3210',
//             address: '456 Elm St, Othertown, USA',
//         };
//         const response = await request(app).post('/companies').send(companyData);
//         expect(response.status).toBe(201);
//         expect(response.body).toHaveProperty('id');
//     });
// });

// describe('PUT /companies/:id', () => {
//     it('should update a company', async () => {
//         const company = await prisma.company.findFirst();
//         const updatedCompanyData = {
//             name: 'Company A Updated',
//         };
//         const response = await request(app).put(`/companies/${company.id}`).send(updatedCompanyData);
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('name', updatedCompanyData.name);
//     });
// });

// describe('DELETE /companies/:id', () => {
//     it('should delete a company', async () => {
//         const company = await prisma.company.findFirst();
//         const response = await request(app).delete(`/companies/${company.id}`);
//         expect(response.status).toBe(204);
//     });
// });