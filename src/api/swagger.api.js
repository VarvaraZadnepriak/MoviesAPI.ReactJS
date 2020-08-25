const express = require('express');
const api = express.Router();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(`${__dirname}/../../swagger.yaml`);

api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = exports = api;
