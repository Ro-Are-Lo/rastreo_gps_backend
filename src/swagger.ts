import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Radiotaxis API',
      version: '1.0.0',
      description: 'Documentación de todos los endpoints del backend'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis: [
    path.join(__dirname, 'modules/**/routes/*.ts'),       // todas las rutas
    path.join(__dirname, 'modules/**/controllers/*.ts')   // todos los controllers
  ],
};

export const swaggerDocs = (app: Express) => {
  try {
    const specs = swaggerJSDoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    console.log('✅ Swagger listo en http://localhost:3000/api-docs');
  } catch (err: any) {
    console.error('❌ ERROR EN SWAGGER');
    console.error(err.stack);
  }
};
