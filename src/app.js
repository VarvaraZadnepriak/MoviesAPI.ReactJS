const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { parseQuery } = require('./utils');
const swaggerApi = require('./api/swagger.api');
const { movieApi, start } = require('./api/movie.api');

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(parseQuery);
app.use(swaggerApi);
app.use(movieApi);

module.exports = {
    app,
    start
};
