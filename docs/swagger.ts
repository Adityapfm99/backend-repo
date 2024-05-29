import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as path from 'path';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Api Docs',
      version: '1.0.0',
      description: 'API documentation for your Express.js application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: [path.resolve(__dirname, '..', 'controller', '*.ts')], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;