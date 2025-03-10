import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Adoptme",
      version: "1.0.0",
      description: "Documentación de la API",
    },
  },
  apis: [path.join(__dirname, "../docs/*.swagger.js")],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };