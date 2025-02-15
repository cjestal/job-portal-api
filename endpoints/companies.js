const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/companies' });
const prisma = new PrismaClient();

// Create Company
router.post('/companies', async (ctx) => {
    try {
        const company = await prisma.company.create({
            data: {
                name: ctx.request.body.name,
                location: ctx.request.body.location,
                logoUrl: ctx.request.body.logoUrl,
                description: ctx.request.body.description,
                highlights: ctx.request.body.highlights,
            },
        });
        ctx.body = company;
        ctx.status = 201;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});

// Get All Companies
router.get('/companies', async (ctx) => {
    try {
        const companies = await prisma.company.findMany();
        ctx.body = companies;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Get Company by ID
router.get('/companies/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const company = await prisma.company.findUnique({ where: { id } });
        if (!company) {
            ctx.status = 404;
            ctx.body = { error: 'Company not found' };
        } else {
            ctx.body = company;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Update Company
router.patch('/companies/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const company = await prisma.company.findUnique({ where: { id } });
        if (!company) {
            ctx.status = 404;
            ctx.body = { error: 'Company not found' };
        } else {
            const updatedCompany = await prisma.company.update({
                where: { id },
                data: {
                    name: ctx.request.body.name,
                    location: ctx.request.body.location,
                    logoUrl: ctx.request.body.logoUrl,
                    description: ctx.request.body.description,
                    highlights: ctx.request.body.highlights,
                },
            });
            ctx.body = updatedCompany;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Delete Company
router.delete('/companies/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        await prisma.company.delete({ where: { id } });
        ctx.status = 204;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Get Company Jobs
router.get('/companies/:id/jobs', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const company = await prisma.company.findUnique({ where: { id } });
        if (!company) {
            ctx.status = 404;
            ctx.body = { error: 'Company not found' };
        } else {
            const jobs = await prisma.job.findMany({ where: { companyId: id } });
            ctx.body = jobs;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;