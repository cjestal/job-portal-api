const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            id: 1,
            name: 'John Doe',
            codeName: 'johndoe123',
            email: 'johndoe@example.com',
            phone: '123-456-7890',
            password: 'password123',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            id: 2,
            name: 'Jane Doe',
            codeName: 'janedoe123',
            email: 'janedoe@example.com',
            phone: '987-654-3210',
            password: 'password123',
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
            jobs: {
                create: [
                    {
                        title: 'Software Engineer',
                        location: 'New York',
                        minSalary: 80000.00,
                        maxSalary: 120000.00,
                        imageUri: 'https://example.com/software-engineer-image.jpg',
                        postDate: new Date('2022-01-01'),
                        isOpen: true,
                    },
                    {
                        title: 'Data Scientist',
                        location: 'New York',
                        minSalary: 100000.00,
                        maxSalary: 150000.00,
                        imageUri: 'https://example.com/data-scientist-image.jpg',
                        postDate: new Date('2022-02-01'),
                        isOpen: true,
                    },
                ],
            },
        },
    });

    const company2 = await prisma.company.create({
        data: {
            name: 'Company B',
            location: 'San Francisco',
            logoUrl: 'https://example.com/company-b-logo.png',
            description: 'Company B is a leading fintech firm.',
            highlights: 'Competitive salary, flexible work hours, opportunities for growth.',
            jobs: {
                create: [
                    {
                        title: 'Product Manager',
                        location: 'San Francisco',
                        minSalary: 120000.00,
                        maxSalary: 180000.00,
                        imageUri: 'https://example.com/product-manager-image.jpg',
                        postDate: new Date('2022-03-01'),
                        isOpen: true,
                    },
                ],
            },
        },
    });

    // Create job applications
    await prisma.jobApplication.create({
        data: {
            jobId: company1.jobs[0].id,
            userId: user1.id,
            resume: 'Resume for John Doe',
            coverLetter: 'Cover letter for John Doe',
            status: 'Applied',
        },
    });

    await prisma.jobApplication.create({
        data: {
            jobId: company1.jobs[1].id,
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