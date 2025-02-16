const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const prisma = new PrismaClient();

// Create User
router.post('/', async (ctx) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: ctx.request.body.name,
                email: ctx.request.body.email,
                password: ctx.request.body.password,
            },
        });
        ctx.body = user;
        ctx.status = 201;
    } catch (error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
    }
});

// Get All Users
router.get('/', async (ctx) => {
    try {
        const users = await prisma.user.findMany();
        ctx.body = users;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Get User by ID
router.get('/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            ctx.status = 404;
            ctx.body = { error: 'User not found' };
        } else {
            ctx.body = user;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Update User
router.patch('/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            ctx.status = 404;
            ctx.body = { error: 'User not found' };
        } else {
            const updatedUser = await prisma.user.update({
                where: { id },
                data: {
                    name: ctx.request.body.name,
                    email: ctx.request.body.email,
                    password: ctx.request.body.password,
                },
            });
            ctx.body = updatedUser;
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Delete User
router.delete('/:id', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        await prisma.user.delete({ where: { id } });
        ctx.status = 204;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// Get User Applications
router.get('/:id/applications', async (ctx) => {
    try {
        const id = parseInt(ctx.params.id);
        const applications = await prisma.jobApplication.findMany({ where: { userId: id } });
        ctx.body = applications;
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;