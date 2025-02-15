const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/job-applications' });
const prisma = new PrismaClient();

// Create Job Application
router.post('/', async (ctx) => {
    try {
        const jobApplication = await prisma.jobApplication.create({
            data: {
                jobId: ctx.request.body.jobId,
                userId: ctx.request.body.userId,
                resume: ctx.request.body.resume,
                coverLetter: ctx.request.body.coverLetter,
                status: ctx.request.body.status,
            },
        });
        ctx.body = jobApplication;
        ctx.status = 201;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});

// Get All Job Applications
router.get('/', async (ctx) => {
    try {
        const jobApplications = await prisma.jobApplication.findMany();
        ctx.body = jobApplications;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Get Job Application by ID
router.get('/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const jobApplication = await prisma.jobApplication.findUnique({ where: { id } });
        if (!jobApplication) {
            ctx.status = 404;
            ctx.body = { error: 'Job Application not found' };
        } else {
            ctx.body = jobApplication;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Update Job Application
router.patch('/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const jobApplication = await prisma.jobApplication.findUnique({ where: { id } });
        if (!jobApplication) {
            ctx.status = 404;
            ctx.body = { error: 'Job Application not found' };
        } else {
            const updatedJobApplication = await prisma.jobApplication.update({
                where: { id },
                data: {
                    jobId: ctx.request.body.jobId,
                    userId: ctx.request.body.userId,
                    resume: ctx.request.body.resume,
                    coverLetter: ctx.request.body.coverLetter,
                    status: ctx.request.body.status,
                },
            });
            ctx.body = updatedJobApplication;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Delete Job Application
router.delete('/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        await prisma.jobApplication.delete({ where: { id } });
        ctx.status = 204;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Get Job Applications by Job ID
router.get('/jobs/:jobId/applications', async (ctx) => {
    try {
        const jobId = parseInt(ctx.params.jobId);
        const jobApplications = await prisma.jobApplication.findMany({ where: { jobId } });
        ctx.body = jobApplications;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Get Job Applications by User ID
router.get('/users/:userId/applications', async (ctx) => {
    try {
        const userId = parseInt(ctx.params.userId);
        const jobApplications = await prisma.jobApplication.findMany({ where: { userId } });
        ctx.body = jobApplications;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;