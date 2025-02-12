const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/job-applications' });
const prisma = new PrismaClient();

// Get all job applications
router.get('/', async (ctx) => {
    const jobApplications = await prisma.jobApplication.findMany();
    ctx.body = jobApplications;
});

// Get a single job application by ID
router.get('/:id', async (ctx) => {
    const id = ctx.params.id;
    const jobApplication = await prisma.jobApplication.findUnique({ where: { id: Number(id) } });
    if (!jobApplication) {
        ctx.status = 404;
        ctx.body = { message: 'Job application not found' };
    } else {
        ctx.body = jobApplication;
    }
});

// Create a new job application
router.post('/', async (ctx) => {
    const { jobId, userId, resume, coverLetter } = ctx.request.body;
    const jobApplication = await prisma.jobApplication.create({ data: { jobId: Number(jobId), userId: Number(userId), resume, coverLetter } });
    ctx.body = jobApplication;
});

// Update an existing job application by ID
router.put('/:id', async (ctx) => {
    const id = ctx.params.id;
    const { jobId, userId, resume, coverLetter } = ctx.request.body;
    const jobApplication = await prisma.jobApplication.update({ where: { id: Number(id) }, data: { jobId: Number(jobId), userId: Number(userId), resume, coverLetter } });
    ctx.body = jobApplication;
});

// Delete a job application by ID
router.delete('/:id', async (ctx) => {
    const id = ctx.params.id;
    await prisma.jobApplication.delete({ where: { id: Number(id) } });
    ctx.status = 204;
});

module.exports = router;
