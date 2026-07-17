const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DeskFlow API',
      version: '1.0.0',
      description: 'Internal IT Service Request Portal API'
    },
    servers: [{url: 'http://localhost:5000'}]
  },
  apis: ['./src/routes/*.js','./src/models/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
