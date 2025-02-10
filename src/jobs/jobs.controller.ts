import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

interface JobPosition {
  id: number;
  title: string;
  company: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  imageUri: string;
  postDate: string;
}
@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  @Post()
  create(): string {
    return 'This action adds a new job posting';
  }

  @Get()
  findAll(): JobPosition[] {
    return [
      {
        id: 1,
        title: 'AI Research Scientist 22',
        company: 'Tech Innovators',
        location: 'Nairobi, Kenya',
        minSalary: 120100,
        maxSalary: 160100,
        imageUri:
          'https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_100_100/company-logo_100_100/0/1633985771178/crowdstrike_logo?e=1745452800&v=beta&t=eyLGJDoas-vBBg9cDSy-V_Ky8Oh2Io3f0ZvM-s3DGps',
        postDate: '2023-10-01',
      },
      {
        id: 2,
        title: 'Machine Learning Engineer',
        company: 'AI Solutions',
        location: 'Lagos, Nigeria',
        minSalary: 110100,
        maxSalary: 150100,
        imageUri:
          'https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_100_100/company-logo_100_100/0/1633985771178/crowdstrike_logo?e=1745452800&v=beta&t=eyLGJDoas-vBBg9cDSy-V_Ky8Oh2Io3f0ZvM-s3DGps',
        postDate: '2023-09-25',
      },
      {
        id: 3,
        title: 'Data Scientist',
        company: 'Data Insights',
        location: 'Cape Town, South Africa',
        minSalary: 100100,
        maxSalary: 140100,
        imageUri:
          'https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_100_100/company-logo_100_100/0/1633985771178/crowdstrike_logo?e=1745452800&v=beta&t=eyLGJDoas-vBBg9cDSy-V_Ky8Oh2Io3f0ZvM-s3DGps',
        postDate: '2023-09-20',
      },
      {
        id: 4,
        title: 'AI Product Manager',
        company: 'Innovative AI',
        location: 'Johannesburg, South Africa',
        minSalary: 130100,
        maxSalary: 170100,
        imageUri:
          'https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_100_100/company-logo_100_100/0/1633985771178/crowdstrike_logo?e=1745452800&v=beta&t=eyLGJDoas-vBBg9cDSy-V_Ky8Oh2Io3f0ZvM-s3DGps',
        postDate: '2023-09-15',
      },
      {
        id: 5,
        title: 'Deep Learning Engineer',
        company: 'DeepTech',
        location: 'Accra, Ghana',
        minSalary: 115100,
        maxSalary: 155100,
        imageUri:
          'https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_100_100/company-logo_100_100/0/1633985771178/crowdstrike_logo?e=1745452800&v=beta&t=eyLGJDoas-vBBg9cDSy-V_Ky8Oh2Io3f0ZvM-s3DGps',
        postDate: '2023-09-10',
      },
      {
        id: 6,
        title: 'AI Software Developer',
        company: 'NextGen AI',
        location: 'Cairo, Egypt',
        minSalary: 105100,
        maxSalary: 145100,
        imageUri:
          'https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_100_100/company-logo_100_100/0/1633985771178/crowdstrike_logo?e=1745452800&v=beta&t=eyLGJDoas-vBBg9cDSy-V_Ky8Oh2Io3f0ZvM-s3DGps',
        postDate: '2023-09-05',
      },
      {
        id: 7,
        title: 'Robotics Engineer',
        company: 'RoboTech',
        location: 'Kigali, Rwanda',
        minSalary: 125100,
        maxSalary: 165100,
        imageUri:
          'https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_100_100/company-logo_100_100/0/1633985771178/crowdstrike_logo?e=1745452800&v=beta&t=eyLGJDoas-vBBg9cDSy-V_Ky8Oh2Io3f0ZvM-s3DGps',
        postDate: '2023-08-30',
      },
      {
        id: 8,
        title: 'AI Consultant',
        company: 'ConsultAI',
        location: 'Casablanca, Morocco',
        minSalary: 135100,
        maxSalary: 175100,
        imageUri:
          'https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_100_100/company-logo_100_100/0/1633985771178/crowdstrike_logo?e=1745452800&v=beta&t=eyLGJDoas-vBBg9cDSy-V_Ky8Oh2Io3f0ZvM-s3DGps',
        postDate: '2023-08-25',
      },
      {
        id: 9,
        title: 'Natural Language Processing Engineer',
        company: 'NLP Solutions',
        location: 'Addis Ababa, Ethiopia',
        minSalary: 110100,
        maxSalary: 150100,
        imageUri:
          'https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_100_100/company-logo_100_100/0/1633985771178/crowdstrike_logo?e=1745452800&v=beta&t=eyLGJDoas-vBBg9cDSy-V_Ky8Oh2Io3f0ZvM-s3DGps',
        postDate: '2023-08-20',
      },
      {
        id: 10,
        title: 'AI Ethics Researcher',
        company: 'Ethical AI',
        location: 'Dakar, Senegal',
        minSalary: 120100,
        maxSalary: 160100,
        imageUri:
          'https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_100_100/company-logo_100_100/0/1633985771178/crowdstrike_logo?e=1745452800&v=beta&t=eyLGJDoas-vBBg9cDSy-V_Ky8Oh2Io3f0ZvM-s3DGps',
        postDate: '2023-08-15',
      },
    ];
  }

  @Get(':id')
  findOne(id: string): string {
    return `This action returns a job posting with id ${id}`;
  }

  @Put(':id')
  update(id: string): string {
    return `This action updates a job posting with id ${id}`;
  }

  @Delete(':id')
  remove(id: string): string {
    return `This action removes a job posting with id ${id}`;
  }
}
