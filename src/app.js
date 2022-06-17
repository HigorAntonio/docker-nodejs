require('dotenv/config');
const express = require('express');
const cors = require('cors');

const sessionMiddleware = require('./middlewares/sessionMiddleware');

const app = express();

app.enable('trust proxy');

app.use(cors());

app.use(sessionMiddleware);

app.use(express.json());

app.use(require('./routes'));

module.exports = app;
