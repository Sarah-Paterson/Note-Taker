const express = require('express');

const apiRoutes = require('./api_routes');

const app = express();

app.use('/notes', apiRoutes);

module.exports = app;