import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Global prefix
  app.setGlobalPrefix('api');

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('NestJS Design Patterns API')
    .setDescription(
      'Production-style backend demonstrating all major design patterns with real business use cases',
    )
    .setVersion('1.0')
    .addTag('Creational Patterns')
    .addTag('Structural Patterns')
    .addTag('Behavioral Patterns')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   🚀 NestJS Design Patterns Demo                         ║
  ║                                                           ║
  ║   Server running on: http://localhost:${port}               ║
  ║   API Documentation: http://localhost:${port}/api/docs      ║
  ║                                                           ║
  ║   23 Design Patterns Implemented                         ║
  ║   - 5 Creational Patterns                                ║
  ║   - 7 Structural Patterns                                ║
  ║   - 11 Behavioral Patterns                               ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
  `);
}

bootstrap();
