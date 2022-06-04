const mongoose = require('mongoose');

const logger = require('../lib/logger');

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;

const mongoURL =
  `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@` +
  `${MONGO_HOST}:${MONGO_PORT}/?authSource=admin`;

const connect = () => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connect();

mongoose.connection.on('connecting', () => {
  logger.info('Trying to establish a connection to Mongo...');
});
mongoose.connection.on('connected', () => {
  logger.info('Connected to Mongo');
});
mongoose.connection.on('error', (err) => {
  logger.error('Mongo connection failed ' + err);
  setTimeout(connect, 5000);
});
mongoose.connection.on('disconnected', () => {
  logger.info('Mongo connection closed');
});

module.exports = mongoose;
