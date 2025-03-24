const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = new Router({ prefix: '/auth' });
const prisma = new PrismaClient();

// // Login
router.post('/login', async (ctx) => {
    try {
        const { email, password } = ctx.request.body;
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user) {
            ctx.status = 401;
            ctx.body = { error: 'Invalid email' };
        } else if (password !== user.password) {
            ctx.status = 401;
            ctx.body = { error: 'Invalid password' };
        }
        else {
            // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            //     expiresIn: '1h',
            // });
            // ctx.body = { token, user };
            await prisma.user.update({token: `${user.id}`});
            ctx.body = { user };
            ctx.status = 200;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// // Register User as Individual
router.post('/register/individual', async (ctx) => {
    try {
        const { name, email, password } = ctx.request.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                type: 'INDIVIDUAL',
            },
        });
        ctx.body = user;
        ctx.status = 201;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

// // Register as Company
router.post('/register/company', async (ctx) => {
    try {
        const { name, email, password, companyName, companyLocation } = ctx.request.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const company = await prisma.company.create({
            data: {
                name: companyName,
                location: companyLocation,
            },
        });
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                type: 'COMPANY',
                companyId: company.id,
            },
        });
        ctx.body = user;
        ctx.status = 201;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

module.exports = router;