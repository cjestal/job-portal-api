import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  const config = new DocumentBuilder()
    .setTitle('Job Platform API')
    .setDescription('These are the endpoints for the job platform app for AI Made in Africa')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());
  
  await app.listen(port);
}
bootstrap();
