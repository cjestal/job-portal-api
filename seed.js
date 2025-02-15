import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
        },
    });

    await prisma.company.create({
        data: {
            name: 'Company A',
            location: 'New York',
            logoUrl: 'https://example.com/logo.png',
            description: 'Company A is a leading tech firm that specializes in software development and innovation.',
            highlights: 'Competitive salary, Flexible work hours, Opportunities for growth and development',
            jobs: {
                create: [
                    {
                        title: 'Software Engineer',
                        location: 'New York',
                        minSalary: 80000.00,
                        maxSalary: 120000.00,
                        imageUri: 'https://example.com/image.jpg',
                        postDate: '2022-01-01',
                        isOpen: true,
                    },
                ],
            },
        },
    });

    await prisma.jobApplication.create({
        data: {
            jobId: 1,
            userId: 1,
            resume: 'Resume for John Doe',
            coverLetter: 'Cover letter for John Doe',
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