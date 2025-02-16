const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/companies' });
const prisma = new PrismaClient();

// Create Company
router.post('/', async (ctx) => {
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
router.get('/', async (ctx) => {
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
router.get('/:id', async (ctx) => {
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
router.patch('/:id', async (ctx) => {
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
router.delete('/:id', async (ctx) => {
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
router.get('/:id/jobs', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const company = await prisma.company.findUnique({ where: { id } });
        if (!company) {
            ctx.status = 404;
            ctx.body = { error: 'Company not found' };
        } else {
            const jobs = await prisma.job.findMany({
                where: { companyId: id },
                include: { company: true },
            });
            ctx.body = jobs;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;