const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/jobs' });
const prisma = new PrismaClient();


// Get all jobs
router.get('/', async (ctx) => {
    const jobs = await prisma.job.findMany();
    ctx.body = jobs;
});

// Get a single job by ID
router.get('/:id', async (ctx) => {
    const id = ctx.params.id;
    const job = await prisma.job.findUnique({ where: { id: Number(id) } });
    if (!job) {
        ctx.status = 404;
        ctx.body = { message: 'Job not found' };
    } else {
        ctx.body = job;
    }
});

// Create a new job
router.post('/', async (ctx) => {
    const { title, description, requirements, companyId } = ctx.request.body;
    const job = await prisma.job.create({ data: { title, description, requirements, companyId: Number(companyId) } });
    ctx.body = job;
});

// Update an existing job by ID
router.put('/:id', async (ctx) => {
    const id = ctx.params.id;
    const { title, description, requirements, companyId } = ctx.request.body;
    const job = await prisma.job.update({ where: { id: Number(id) }, data: { title, description, requirements, companyId: Number(companyId) } });
    ctx.body = job;
});

// Delete a job by ID
router.delete('/:id', async (ctx) => {
    const id = ctx.params.id;
    await prisma.job.delete({ where: { id: Number(id) } });
    ctx.status = 204;
});

module.exports = router;
