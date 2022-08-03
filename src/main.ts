import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Handle validations and transformations for DTOs
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true
    }));

    // Swagger-OpenAPI configuration
    const config = new DocumentBuilder()
        .setTitle('NFTs API')
        .setDescription('Backend dev skill - API to serve NFTs (cryptoavatars)')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, { swaggerOptions: { docExpansion: 'none' } });
    
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
