const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const prisma = new PrismaClient();

// Get all users
router.get('/', async (ctx) => {
    const users = await prisma.user.findMany();
    ctx.body = users;
});

// Get a single user by ID
router.get('/:id', async (ctx) => {
    const id = ctx.params.id;
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
        ctx.status = 404;
        ctx.body = { message: 'User not found' };
    } else {
        ctx.body = user;
    }
});

// Create a new user
router.post('/', async (ctx) => {
    const { name, email, phone, password } = ctx.request.body;
    const user = await prisma.user.create({ data: { name, email, phone, password } });
    ctx.body = user;
});

// Update an existing user by ID
router.put('/:id', async (ctx) => {
    const id = ctx.params.id;
    const { name, email, phone, password } = ctx.request.body;
    const user = await prisma.user.update({ where: { id: Number(id) }, data: { name, email, phone, password } });
    ctx.body = user;
});

// Delete a user by ID
router.delete('/:id', async (ctx) => {
    const id = ctx.params.id;
    await prisma.user.delete({ where: { id: Number(id) } });
    ctx.status = 204;
});

module.exports = router;