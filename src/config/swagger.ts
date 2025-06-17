import swaggerJsdoc from 'swagger-jsdoc';
import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';

const PORT = process.env.PORT || '3000';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bytebank API',
      version: '1.0.0',
      description: 'Documentação da API criada para o projeto bytebank, gerada com Swagger.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60d0fe4f5311236168a109ca' },
            name: { type: 'string', example: 'João da Silva' },
            email: { type: 'string', example: 'joao.silva@example.com' },
          },
        },
        UserInput: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Maria da Silva' },
            email: { type: 'string', example: 'maria.silva@example.com' },
            password: { type: 'string', example: 'senhaForte123!' },
          },
          required: ['name', 'email', 'password'],
        },
        Card: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60f7eabc1234567890abcdef' },
            userId: { type: 'string', example: '60d0fe4f5311236168a109ca' },
            cardNumber: { type: 'string', example: '**** **** **** 1234' },
            name: { type: 'string', example: 'João da Silva' },
            functions: { type: 'array', example: ['credito'] },
            variant: { type: 'string', example: ['black'] },
          },
        },
        CardInput: {
          type: 'object',
          properties: {
            userId: { type: 'string', example: '60d0fe4f5311236168a109ca' },
            cardNumber: { type: 'string', example: '**** **** **** 1234' },
            name: { type: 'string', example: 'João da Silva' },
            functions: { type: 'array', example: ['credito'] },
            variant: { type: 'string', example: ['black'] },
          },
          required: ['userId', 'cardNumber', 'name', 'functions', 'variant']
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/docs/**/*.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
};