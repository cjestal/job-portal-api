const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/jobs' });
const prisma = new PrismaClient();


// Create Job
router.post('/', async (ctx) => {
    try {
        const job = await prisma.job.create({
            data: {
                title: ctx.request.body.title,
                companyId: ctx.request.body.companyId,
                location: ctx.request.body.location,
                minSalary: ctx.request.body.minSalary,
                maxSalary: ctx.request.body.maxSalary,
                imageUri: ctx.request.body.imageUri,
                postDate: ctx.request.body.postDate,
                isOpen: ctx.request.body.isOpen,
            },
        });
        ctx.body = job;
        ctx.status = 201;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});

// Get All Jobs
router.get('/', async (ctx) => {
    try {
        const jobs = await prisma.job.findMany();
        ctx.body = jobs;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Get Job by ID
router.get('/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const job = await prisma.job.findUnique({ where: { id } });
        if (!job) {
            ctx.status = 404;
            ctx.body = { error: 'Job not found' };
        } else {
            ctx.body = job;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Update Job
router.patch('/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const job = await prisma.job.findUnique({ where: { id } });
        if (!job) {
            ctx.status = 404;
            ctx.body = { error: 'Job not found' };
        } else {
            const updatedJob = await prisma.job.update({
                where: { id },
                data: {
                    title: ctx.request.body.title,
                    companyId: ctx.request.body.companyId,
                    location: ctx.request.body.location,
                    minSalary: ctx.request.body.minSalary,
                    maxSalary: ctx.request.body.maxSalary,
                    imageUri: ctx.request.body.imageUri,
                    postDate: ctx.request.body.postDate,
                    isOpen: ctx.request.body.isOpen,
                },
            });
            ctx.body = updatedJob;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Delete Job
router.delete('/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        await prisma.job.delete({ where: { id } });
        ctx.status = 204;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Get Open Jobs
router.get('/open', async (ctx) => {
    try {
        const jobs = await prisma.job.findMany({ where: { isOpen: true } });
        ctx.body = jobs;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Get Closed Jobs
router.get('/closed', async (ctx) => {
    try {
        const jobs = await prisma.job.findMany({ where: { isOpen: false } });
        ctx.body = jobs;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;