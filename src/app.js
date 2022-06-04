require('dotenv/config');
const express = require('express');

const sessionMiddleware = require('./middlewares/sessionMiddleware');

const app = express();

app.use(express.json());

app.use(sessionMiddleware);

app.use(require('./routes'));

module.exports = app;
