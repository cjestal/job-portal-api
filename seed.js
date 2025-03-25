const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    // Users
    const user1 = await prisma.user.create({
      data: {
        name: 'John Doe',
        codeName: 'johndoe',
        email: 'user@test.com',
        phone: '123-456-7890',
        password: 'test123', // Password not hashed
        type: 'INDIVIDUAL',
      },
    });

    const companyUser = await prisma.user.create({
      data: {
        name: 'Acme Corp',
        codeName: 'acmecorp',
        email: 'company@test.com',
        phone: '987-654-3210',
        password: 'test123', // Password not hashed
        type: 'COMPANY',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: 'Jane Smith',
        codeName: 'janesmith',
        email: 'jane@test.com',
        phone: '111-222-3333',
        password: 'test123', // Password not hashed
        type: 'INDIVIDUAL',
      }
    });

    // Companies
    const company1 = await prisma.company.create({
      data: {
        name: 'Acme Corp',
        location: 'New York',
        logoUrl: 'acme.png',
        description: 'We are a leading tech company.',
        highlights: 'Great culture, innovative projects.',
        User: {
          connect: { id: companyUser.id },
        },
      },
    });

    const company2 = await prisma.company.create({
      data: {
        name: 'Globex Corp',
        location: 'London',
        logoUrl: 'globex.png',
        description: 'We are a global firm.',
        highlights: 'International environment.',
      }
    });

    const company3 = await prisma.company.create({
      data: {
        name: "Initech",
        location: "Austin",
        logoUrl: "initech.png",
        description: "We make software.",
        highlights: "Casual Friday every day.",
      }
    })

    // Jobs
    const job1 = await prisma.job.create({
      data: {
        title: 'Software Engineer',
        companyId: company1.id,
        description: 'Looking for a skilled software engineer.',
        location: 'New York',
        minSalary: 80000,
        maxSalary: 120000,
        imageUri: 'software-engineer.jpg',
        postDate: new Date(),
        arrangement: 'HYBRID', // Added arrangement
        experience: 'MID', // Added experience
      },
    });
    
    const job2 = await prisma.job.create({
      data: {
        title: 'Marketing Manager',
        companyId: company2.id,
        description: 'Manage our marketing campaigns.',
        location: 'London',
        minSalary: 60000,
        maxSalary: 90000,
        imageUri: 'marketing-manager.jpg',
        postDate: new Date(),
        arrangement: 'REMOTE', // Added arrangement
        experience: 'JUNIOR', // Added experience
      },
    });
    
    const job3 = await prisma.job.create({
      data: {
        title: 'Database Administrator',
        companyId: company3.id,
        description: 'Manage our databases.',
        location: 'Austin',
        minSalary: 90000,
        maxSalary: 130000,
        imageUri: 'dba.jpg',
        postDate: new Date(),
        arrangement: 'ONSITE', //Added arrangement
        experience: 'SENIOR' // Added experience
      },
    });

    // Job Applications
    await prisma.jobApplication.create({
      data: {
        jobId: job1.id,
        userId: user1.id,
        resume: 'john-resume.pdf',
        coverLetter: 'Dear Hiring Manager...',
        status: 'Applied',
      },
    });

    await prisma.jobApplication.create({
      data: {
        jobId: job2.id,
        userId: user2.id,
        resume: 'jane-resume.pdf',
        coverLetter: 'To whom it may concern...',
        status: 'Under Review',
      },
    });

    await prisma.jobApplication.create({
      data: {
        jobId: job3.id,
        userId: user1.id,
        resume: "john-resume2.pdf",
        coverLetter: "Another cover letter",
        status: "Applied",
      }
    })

    // Skills
    const skill1 = await prisma.skill.create({ data: { name: 'JavaScript' } });
    const skill2 = await prisma.skill.create({ data: { name: 'Marketing' } });
    const skill3 = await prisma.skill.create({data: {name: "SQL"}})

    // Topics
    const topic1 = await prisma.topic.create({ data: { name: 'Technology' } });
    const topic2 = await prisma.topic.create({ data: { name: 'Marketing' } });
    const topic3 = await prisma.topic.create({ data: { name: 'Career Advice' } });

    // User Posts
    await prisma.userPost.create({
      data: {
        userId: user1.id,
        title: 'My First Post',
        content: 'This is my first post.',
        imageUri: 'post1.jpg',
        topicId: topic1.id,
      },
    });

    await prisma.userPost.create({
      data: {
        userId: companyUser.id,
        title: 'Company News',
        content: 'We are hiring!',
        imageUri: 'post2.jpg',
        topicId: topic2.id,
      },
    });

    await prisma.userPost.create({
        data: {
            userId: user2.id,
            title: "Job Search Tips",
            content: "Here are some job search tips",
            imageUri: "post3.jpg",
            topicId: topic3.id,
        }
    })

    // connect skills to users and jobs.
    await prisma.user.update({where: {id: user1.id}, data: {skills: {connect: [{id: skill1.id}, {id: skill3.id}]}}})
    await prisma.user.update({where: {id: user2.id}, data: {skills: {connect: [{id: skill2.id}]}}})
    await prisma.job.update({where: {id: job1.id}, data: {skills: {connect: [{id: skill1.id}]}}})
    await prisma.job.update({where: {id: job2.id}, data: {skills: {connect: [{id: skill2.id}]}}})
    await prisma.job.update({where: {id: job3.id}, data: {skills: {connect: [{id: skill3.id}]}}})

    console.log('Seed data created successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
