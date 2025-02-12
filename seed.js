const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create companies
    const company1 = await prisma.company.create({
        data: {
            name: 'Company A',
            email: 'info@companya.com',
            phone: '123-456-7890',
            address: '123 Main St, Anytown, USA',
        },
    });

    const company2 = await prisma.company.create({
        data: {
            name: 'Company B',
            email: 'info@companyb.com',
            phone: '987-654-3210',
            address: '456 Elm St, Othertown, USA',
        },
    });

    // Create jobs
    const job1 = await prisma.job.create({
        data: {
            title: 'Software Engineer',
            description: 'Develop software applications',
            requirements: 'Bachelor\'s degree in Computer Science',
            companyId: company1.id,
        },
    });

    const job2 = await prisma.job.create({
        data: {
            title: 'Data Scientist',
            description: 'Analyze data and develop models',
            requirements: 'Master\'s degree in Data Science',
            companyId: company2.id,
        },
    });

    // Create users
    const user1 = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '555-123-4567',
            password: 'password123',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            phone: '555-901-2345',
            password: 'password456',
        },
    });

    // Create job applications
    const application1 = await prisma.jobApplication.create({
        data: {
            jobId: job1.id,
            userId: user1.id,
            resume: 'Resume for John Doe',
            coverLetter: 'Cover letter for John Doe',
            status: 'Applied',
        },
    });

    const application2 = await prisma.jobApplication.create({
        data: {
            jobId: job2.id,
            userId: user2.id,
            resume: 'Resume for Jane Doe',
            coverLetter: 'Cover letter for Jane Doe',
            status: 'Applied',
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });