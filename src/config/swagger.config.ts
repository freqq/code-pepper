import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export const applySwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Star Wars Manager')
    .setDescription('Manage SW characters and episodes')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Star Wars Manager',
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      defaultModelsExpandDepth: -1,
    },
  };

  SwaggerModule.setup('api-docs', app, document, customOptions);
};
