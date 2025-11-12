/**
 * Universal Blockchain Verification Hub (UBVH) powered by ADN_iD
 * Main Application Entry Point
 * 
 * بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
 * "One Verification Layer, Infinite Possibilities"
 * 
 * @author Muhammad Adnan Ul Mustafa <adnanmd76@gmail.com>
 * @version 1.0.0
 */

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';

import { AppModule } from './app.module';
import { LoggingInterceptor } from '@shared/interceptors/logging.interceptor';
import { ErrorsInterceptor } from '@shared/interceptors/errors.interceptor';
import { TransformInterceptor } from '@shared/interceptors/transform.interceptor';
import { AllExceptionsFilter } from '@shared/filters/all-exceptions.filter';
import { setupPrometheus } from '@shared/monitoring/prometheus';

/**
 * Bootstrap the UBVH application
 */
async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  
  try {
    // Create NestJS application
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    // Get configuration service
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 3000);
    const environment = configService.get<string>('NODE_ENV', 'development');
    const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');

    // Security middleware
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false,
    }));

    // CORS configuration
    app.use(cors({
      origin: configService.get<string>('CORS_ORIGIN', '*'),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'X-Network-ID'],
      credentials: true,
    }));

    // Compression middleware
    app.use(compression());

    // Global API prefix
    app.setGlobalPrefix(apiPrefix);

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );

    // Global interceptors
    app.useGlobalInterceptors(
      new LoggingInterceptor(),
      new ErrorsInterceptor(),
      new TransformInterceptor()
    );

    // Global exception filter
    app.useGlobalFilters(new AllExceptionsFilter());

    // Setup Prometheus metrics
    setupPrometheus(app);

    // Swagger API documentation
    if (environment !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('UBVH API Documentation')
        .setDescription(`
          Universal Blockchain Verification Hub (UBVH) powered by ADN_iD
          
          The world's first Master Verification Layer that eliminates the need for separate blockchains
          while providing universal verification, security, and scalability.
          
          Features:
          - Universal verification across all networks
          - Genesis Protocol with 99.9998% energy savings
          - Islamic compliance framework
          - Quantum-ready security
          - Super Agent Zi AI integration
          
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          "One Verification Layer, Infinite Possibilities"
        `)
        .setVersion('1.0.0')
        .setContact(
          'Muhammad Adnan Ul Mustafa',
          'https://ubvh.io',
          'adnanmd76@gmail.com'
        )
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .addServer(`http://localhost:${port}`, 'Development Server')
        .addServer('https://api.ubvh.io', 'Production Server')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
          },
          'JWT-auth'
        )
        .addApiKey(
          {
            type: 'apiKey',
            name: 'X-API-Key',
            in: 'header',
            description: 'API Key for network integration',
          },
          'API-Key'
        )
        .addTag('Authentication', 'User authentication and authorization')
        .addTag('Verification', 'Universal verification services')
        .addTag('Identity', 'ADN_iD identity management')
        .addTag('Networks', 'Network registration and management')
        .addTag('Security', 'Quantum security and threat detection')
        .addTag('Compliance', 'Regulatory compliance automation')
        .addTag('Explorer', 'Universal blockchain explorer')
        .addTag('AI Agent', 'Super Agent Zi integration')
        .addTag('Analytics', 'Cross-network analytics')
        .addTag('Islamic Finance', 'Sharia-compliant features')
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('docs', app, document, {
        customSiteTitle: 'UBVH API Documentation',
        customfavIcon: '/favicon.ico',
        customCss: `
          .swagger-ui .topbar { display: none; }
          .swagger-ui .info .title { color: #2c5aa0; }
          .swagger-ui .info .description { font-size: 14px; }
        `,
        swaggerOptions: {
          persistAuthorization: true,
          displayRequestDuration: true,
          filter: true,
          showExtensions: true,
          showCommonExtensions: true,
        },
      });

      logger.log(`📚 API Documentation available at: http://localhost:${port}/docs`);
    }

    // Start the server
    await app.listen(port, '0.0.0.0');

    // Log startup information
    logger.log(`🚀 UBVH Application started successfully!`);
    logger.log(`🌍 Environment: ${environment}`);
    logger.log(`🔗 Server running on: http://localhost:${port}`);
    logger.log(`📡 API Endpoint: http://localhost:${port}/${apiPrefix}`);
    logger.log(`🔐 Health Check: http://localhost:${port}/${apiPrefix}/health`);
    
    if (environment !== 'production') {
      logger.log(`📊 Metrics: http://localhost:${port}/metrics`);
    }

    // Islamic blessing
    logger.log(`🕌 بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ`);
    logger.log(`✨ "One Verification Layer, Infinite Possibilities"`);
    logger.log(`🌟 إِنَّ مَعَ الْعُسْرِ يُسْرًا - "Indeed, with hardship comes ease."`);

  } catch (error) {
    logger.error('❌ Failed to start UBVH application:', error);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  const logger = new Logger('UncaughtException');
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  const logger = new Logger('UnhandledRejection');
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  const logger = new Logger('SIGTERM');
  logger.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', async () => {
  const logger = new Logger('SIGINT');
  logger.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

// Bootstrap the application
bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Failed to bootstrap application:', error);
  process.exit(1);
});