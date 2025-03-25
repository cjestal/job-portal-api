const { PrismaClient } = require('@prisma/client');
const Router = require('koa-router');
const router = new Router({ prefix: '/jobs' });
const prisma = new PrismaClient();

// Create Job
router.post('/', async (ctx) => {
  try {
    const job = await prisma.job.create({
      data: {
        name: ctx.request.body.name, // Changed from title to name
        companyId: ctx.request.body.companyId,
        location: ctx.request.body.location,
        minSalary: ctx.request.body.minSalary,
        maxSalary: ctx.request.body.maxSalary,
        imageUri: ctx.request.body.imageUri,
        postDate: ctx.request.body.postDate,
        isOpen: ctx.request.body.isOpen,
        arrangement: ctx.request.body.arrangement, // Added arrangement
        experience: ctx.request.body.experience, // Added experience
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
    const jobs = await prisma.job.findMany({
      include: { company: true, skills: true }, // Include skills
    });
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
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: true,
        skills: true, // Include skills
      },
    });
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
          name: ctx.request.body.name, // Changed from title to name
          companyId: ctx.request.body.companyId,
          location: ctx.request.body.location,
          minSalary: ctx.request.body.minSalary,
          maxSalary: ctx.request.body.maxSalary,
          imageUri: ctx.request.body.imageUri,
          postDate: ctx.request.body.postDate,
          isOpen: ctx.request.body.isOpen,
          arrangement: ctx.request.body.arrangement, // Added arrangement
          experience: ctx.request.body.experience, // Added experience
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
    const jobs = await prisma.job.findMany({ where: { isOpen: true }, include: {skills: true} });
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
    const jobs = await prisma.job.findMany({ where: { isOpen: false }, include: {skills: true} });
    ctx.body = jobs;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// Get Applicants for a Job
router.get('/:id/applicants', async (ctx) => {
  try {
    const id = parseInt(ctx.params.id);
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      ctx.status = 404;
      ctx.body = { error: 'Job not found' };
    } else {
      const applicants = await prisma.jobApplication.findMany({
        where: { jobId: id },
        include: { user: true },
      });
      ctx.body = applicants.map((applicant) => ({
        id: applicant.id,
        userId: applicant.userId,
        user: applicant.user,
        resume: applicant.resume,
        coverLetter: applicant.coverLetter,
        status: applicant.status,
      }));
      ctx.status = 200;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

//search jobs
router.get('/search', async(ctx)=>{
    try{
        const {name, arrangement, location, experience} = ctx.query;
        const jobs = await prisma.job.findMany({
            where: {
                name: {contains: name, mode: 'insensitive'},
                arrangement: {equals: arrangement},
                location: {contains: location, mode: 'insensitive'},
                experience: {equals: experience}
            },
            include: {skills: true, company: true}
        })
        ctx.body = jobs;
        ctx.status = 200;
    } catch(error){
        ctx.status = 500;
        ctx.body = {error: error.message}
    }
})

//Get Job Skills
router.get('/:id/skills', async(ctx)=>{
    try{
        const id = parseInt(ctx.params.id);
        const job = await prisma.job.findUnique({
            where: {id},
            include: {skills: true}
        })
        if(!job){
            ctx.status = 404;
            ctx.body = {error: "Job not found"}
        } else {
            ctx.body = job.skills
            ctx.status = 200;
        }

    } catch(error){
        ctx.status = 500;
        ctx.body = {error: error.message}
    }
})

module.exports = router;
