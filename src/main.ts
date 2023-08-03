import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { applySwagger } from './config/swagger.config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger: LoggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.use(helmet());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableShutdownHooks();
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  applySwagger(app);

  await app.listen(3000);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
