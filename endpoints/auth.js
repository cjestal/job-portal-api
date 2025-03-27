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

// Dashboard
router.get('/dashboard', async (ctx) => {
  try {
    const { userId } = ctx.query;
    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });

    if (!user) {
      ctx.status = 404;
      ctx.body = { error: 'User not found' };
      return;
    }

    if (user.type === 'COMPANY') {
      const company = await prisma.company.findUnique({ where: { id: user.companyId } });

      if (!company) {
        ctx.status = 404;
        ctx.body = { error: 'Company not found' };
        return;
      }

      const openJobs = await prisma.job.findMany({
        where: { companyId: company.id, isOpen: true },
        include: { company: { select: { name: true } } },
      });
      const closedJobs = await prisma.job.findMany({
        where: { companyId: company.id, isOpen: false },
        include: { company: { select: { name: true } } },
      });

      const applicants = await prisma.jobApplication.findMany({
        where: {
          job: {
            companyId: company.id,
          },
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
          job: {
            select: {
              title: true,
            },
          },
        },
      });

      const rejectedApplications = await prisma.jobApplication.findMany({
        where: {
          job: {
            companyId: company.id,
          },
          status: 'rejected',
        },
      });

      ctx.body = {
        companyDetails: company,
        userDetails: user,
        openJobs: openJobs,
        applicantCount: applicants.length,
        applicants: applicants,
        closedJobs: closedJobs,
        rejectedApplications: rejectedApplications.length,
      };
    } else if (user.type === 'INDIVIDUAL') {
      const openApplications = await prisma.jobApplication.findMany({
        where: {
          userId: user.id,
          job: {
            isOpen: true,
          },
        },
        include: {
          job: true,
        },
      });

      const pastApplications = await prisma.jobApplication.findMany({
        where: {
          userId: user.id,
          job: {
            isOpen: false,
          },
        },
        include: {
          job: true,
        },
      });

      ctx.body = {
        userDetails: user,
        openApplications: openApplications,
        pastApplications: pastApplications,
      };
    } else {
      ctx.status = 400;
      ctx.body = { error: 'Invalid user type' };
      return;
    }

    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

module.exports = router;
