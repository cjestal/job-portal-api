const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/auth' });
const prisma = new PrismaClient();

// Login
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
    } else {
      ctx.body = { id: user.id, user: user };
      ctx.status = 200;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// Register User
router.post('/signup', async (ctx) => {
  try {
    const { name, email, password, type, companyName, companyLocation, codeName, phone, logoUrl, description, highlights } = ctx.request.body;
    let user;

    if (type === 'COMPANY') {
      const company = await prisma.company.create({
        data: {
          name: companyName,
          location: companyLocation,
          logoUrl,
          description,
          highlights,
        },
      });

      user = await prisma.user.create({
        data: {
          name,
          email,
          password: password,
          type: 'COMPANY',
          companyId: company.id,
          codeName: codeName,
          phone: phone,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          type: 'INDIVIDUAL',
          codeName,
          phone,
        },
      });
    }

    ctx.body = user;
    ctx.status = 201;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

module.exports = router;
