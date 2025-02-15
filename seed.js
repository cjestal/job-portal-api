const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            name: 'John Doe',
            codeName: 'johndoe123',
            email: 'johndoe@example.com',
            phone: '123-456-7890',
            password: 'password123',
            type: 'INDIVIDUAL',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Jane Doe',
            codeName: 'janedoe123',
            email: 'janedoe@example.com',
            phone: '987-654-3210',
            password: 'password123',
            type: 'INDIVIDUAL',
        },
    });

    // Create companies
    const company1 = await prisma.company.create({
        data: {
            name: 'Company A',
            location: 'New York',
            logoUrl: 'https://example.com/company-a-logo.png',
            description: 'Company A is a leading tech firm.',
            highlights: 'Competitive salary, flexible work hours, opportunities for growth.',
        },
    });

    const company2 = await prisma.company.create({
        data: {
            name: 'Company B',
            location: 'San Francisco',
            logoUrl: 'https://example.com/company-b-logo.png',
            description: 'Company B is a leading fintech firm.',
            highlights: 'Competitive salary, flexible work hours, opportunities for growth.',
        },
    });

    // Create jobs
    const job1 = await prisma.job.create({
        data: {
            title: 'Software Engineer',
            location: 'New York',
            minSalary: 80000.00,
            maxSalary: 120000.00,
            imageUri: 'https://example.com/software-engineer-image.jpg',
            postDate: new Date('2022-01-01'),
            isOpen: true,
            description: 'Develop software applications',
            companyId: company1.id,
        },
    });

    const job2 = await prisma.job.create({
        data: {
            title: 'Data Scientist',
            location: 'New York',
            minSalary: 100000.00,
            maxSalary: 150000.00,
            imageUri: 'https://example.com/data-scientist-image.jpg',
            postDate: new Date('2022-02-01'),
            isOpen: true,
            description: 'Analyze data and develop models',
            companyId: company1.id,
        },
    });

    const job3 = await prisma.job.create({
        data: {
            title: 'Product Manager',
            location: 'San Francisco',
            minSalary: 120000.00,
            maxSalary: 180000.00,
            imageUri: 'https://example.com/product-manager-image.jpg',
            postDate: new Date('2022-03-01'),
            isOpen: true,
            description: 'Manage product development lifecycle',
            companyId: company2.id,
        },
    });

    // Create job applications
    await prisma.jobApplication.create({
        data: {
            jobId: job1.id,
            userId: user1.id,
            resume: 'Resume for John Doe',
            coverLetter: 'Cover letter for John Doe',
            status: 'Applied',
        },
    });

    await prisma.jobApplication.create({
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