const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/companies' });
const prisma = new PrismaClient();

// Get all companies
router.get('/', async (ctx) => {
    const companies = await prisma.company.findMany();
    ctx.body = companies;
});

// Get a single company by ID
router.get('/:id', async (ctx) => {
    const id = ctx.params.id;
    const company = await prisma.company.findUnique({ where: { id: Number(id) } });
    if (!company) {
        ctx.status = 404;
        ctx.body = { message: 'Company not found' };
    } else {
        ctx.body = company;
    }
});

// Create a new company
router.post('/', async (ctx) => {
    const { name, email, phone, address } = ctx.request.body;
    const company = await prisma.company.create({ data: { name, email, phone, address } });
    ctx.body = company;
});

// Update an existing company by ID
router.put('/:id', async (ctx) => {
    const id = ctx.params.id;
    const { name, email, phone, address } = ctx.request.body;
    const company = await prisma.company.update({ where: { id: Number(id) }, data: { name, email, phone, address } });
    ctx.body = company;
});

// Delete a company by ID
router.delete('/:id', async (ctx) => {
    const id = ctx.params.id;
    await prisma.company.delete({ where: { id: Number(id) } });
    ctx.status = 204;
});
module.exports = router;