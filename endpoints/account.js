const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/account' });
const prisma = new PrismaClient();

// GET dashboard - individual

router.get('/dashboard/individual', async (ctx) => {
    const userId = ctx.state.user.id;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            jobApplications: true,
        },
    });

    if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
    }

    if (user.type !== 'INDIVIDUAL') {
        ctx.status = 403;
        ctx.body = { error: 'Forbidden' };
        return;
    }

    ctx.body = {
        applications: user.jobApplications,
    };
});

// GET dashboard - company
router.get('/dashboard/company', async (ctx) => {
    const userId = ctx.state.user.id;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            company: true,
            jobApplications: true,
        },
    });

    if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
    }

    if (user.type !== 'COMPANY') {
        ctx.status = 403;
        ctx.body = { error: 'Forbidden' };
        return;
    }

    const jobs = await prisma.job.findMany({
        where: { companyId: user.companyId },
    });

    ctx.body = {
        jobs,
        applications: user.jobApplications,
    };
});

// GET profile - individual
router.get('/profile/individual', async (ctx) => {
    const userId = ctx.state.user.id;
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
    }

    if (user.type !== 'INDIVIDUAL') {
        ctx.status = 403;
        ctx.body = { error: 'Forbidden' };
        return;
    }

    ctx.body = {
        name: user.name,
        email: user.email,
        phone: user.phone,
    };
});

// GET profile - company
router.get('/profile/company', async (ctx) => {
    const userId = ctx.state.user.id;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            company: true,
        },
    });

    if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
    }

    if (user.type !== 'COMPANY') {
        ctx.status = 403;
        ctx.body = { error: 'Forbidden' };
        return;
    }

    ctx.body = {
        companyName: user.company.name,
        companyLocation: user.company.location,
        companyDescription: user.company.description,
    };
});

// GET User settings
router.get('/settings', async (ctx) => {
    const userId = ctx.state.user.id;
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
    }

    ctx.body = {
        name: user.name,
        email: user.email,
        phone: user.phone,
    };
});

module.exports = router;